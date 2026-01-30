import { useState, useCallback, useEffect, useRef } from "react";
import { DEFAULT_PAGE_SIZE } from "./constants";
import type { CrudContextValue, RecordType, UseCrudOptions } from "./types";
import type { PageResult } from "@/types/api.ts";

export function useCrud<T = any, D extends RecordType = RecordType>(
  options: UseCrudOptions<T, D>,
): CrudContextValue<T, D> {
  const {
    request,
    initialParams = {} as D,
    defaultPageSize = DEFAULT_PAGE_SIZE,
    autoRequest = true,
  } = options;

  // 1. 数据状态
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 2. 参数状态（业务参数）
  const [params, setParams] = useState<D>(initialParams);

  // 3. 分页状态
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: defaultPageSize,
    total: 0,
  });

  const mountedRef = useRef(false);

  const fetchData = useCallback(
    async (queryParams: D, pageParams: { pageIndex: number; pageSize: number }) => {
      setLoading(true);
      try {
        // 合并参数：业务参数 + 分页参数
        const data: PageResult<T> = await request({
          ...queryParams,
          ...pageParams,
        });

        setDataSource(data.list ?? []);
        setPagination((prev) => ({
          ...prev,
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
          total: data.total,
        }));
      } catch (error) {
        console.error("CrudPage request failed:", error);
      } finally {
        setLoading(false);
      }
    },
    [request],
  );

  const search = useCallback(
    (newParams: D) => {
      const nextParams = { ...params, ...newParams };
      setParams(nextParams);

      fetchData(nextParams, {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }).then(() => {});
    },
    [params, pagination.pageSize, pagination.pageIndex, fetchData],
  );

  const refresh = useCallback(() => {
    fetchData(params, {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    }).then(() => {});
  }, [fetchData, params, pagination.pageIndex, pagination.pageSize]);

  /**
   * 翻页 / 改变页大小
   */
  const handlePageChange = useCallback(
    (pageIndex: number, pageSize?: number) => {
      const newPageSize = pageSize || pagination.pageSize;
      setPagination((p) => ({ ...p, pageIndex, pageSize: newPageSize }));
      fetchData(params, { pageIndex, pageSize: newPageSize }).then(() => {});
    },
    [params, pagination.pageSize, fetchData],
  );

  useEffect(() => {
    if (autoRequest && !mountedRef.current) {
      mountedRef.current = true;
      fetchData(params, {
        pageIndex: 1,
        pageSize: defaultPageSize,
      }).then(() => {});
    }
  }, [autoRequest, params, defaultPageSize, fetchData]);

  return {
    dataSource,
    loading,
    params,
    pagination,
    search,
    refresh,
    handlePageChange,
  };
}
