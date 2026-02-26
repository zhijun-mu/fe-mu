import { type ReactNode } from "react";
import { useState, useMemo, useCallback, useEffect } from "react";

import type { CrudApi, CrudContextValue, CrudPageParams, CrudQueryParams } from "./types.ts";
import { CrudContext } from "./context.ts";

type CrudProviderProps<T> = {
  api?: CrudApi<T>;
  children: ReactNode;
};

const DEFAULT_PAGINATION = {
  pageIndex: 1,
  pageSize: 25,
};

export function CrudProvider<T>({ api, children }: CrudProviderProps<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState({
    total: 0,
    pages: 0,
    ...DEFAULT_PAGINATION,
  });
  const [queryParams, setQueryParams] =
    useState<CrudQueryParams<Record<string, any>>>(DEFAULT_PAGINATION);

  const loadTable = useCallback(async () => {
    if (!api || !api.page) return;
    setLoading(true);
    try {
      const result = await api.page(queryParams);
      setData(result.list);
      setPage({
        total: result.total,
        pages: result.pages,
        pageIndex: result.pageIndex,
        pageSize: result.pageSize,
      });
    } finally {
      setLoading(false);
    }
  }, [api, queryParams]);

  // 1. 搜索表单触发：应用新搜索条件，并回到第一页
  const onFilter = useCallback((filters: Record<string, any>) => {
    setQueryParams((prev) => ({
      ...filters, // 这里传入的是表单全部字段，直接覆盖旧的过滤条件
      pageIndex: 1,
      pageSize: prev.pageSize,
    }));
  }, []);

  // 2. 表单重置触发：清空搜索条件，回到第一页
  const onReset = useCallback(() => {
    setQueryParams((prev) => ({
      pageIndex: 1,
      pageSize: prev.pageSize,
    }));
  }, []);

  // 3. 表格分页器触发：改变页码/条数，且【必须保留】现有的搜索条件
  const onPaginate = useCallback((pagination: CrudPageParams) => {
    setQueryParams((prev) => ({
      ...prev, // 保留现有的 filters
      ...pagination, // 覆盖 pageIndex 和 pageSize
    }));
  }, []);

  useEffect(() => {
    loadTable().then(() => {});
  }, [loadTable]);

  const value: CrudContextValue<T> = useMemo(
    () => ({
      data,
      page,
      loading,
      onFilter,
      onReset,
      onPaginate,
    }),
    [data, page, loading, onFilter, onReset, onPaginate],
  );

  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
}
