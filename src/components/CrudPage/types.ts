import type { ReactNode } from "react";
import type { PageResult } from "@/types/api.ts";

export type RecordType = Record<string, any>;

export interface CrudContextValue<T, D extends RecordType> {
  dataSource: T[];
  loading: boolean;
  params: D;
  pagination: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  search: (newParams: D, resetPage?: boolean) => void;
  refresh: () => void;
  handlePageChange: (pageIndex: number, pageSize?: number) => void;
}

export interface UseCrudOptions<T, D> {
  request: CrudRequest<T, D>;
  initialParams?: D;
  defaultPageSize?: number;
  autoRequest?: boolean;
}

/**
 * =========================
 * 3. 组件 Props 定义
 * =========================
 */
export interface CrudPageProps<T = any, D extends RecordType = RecordType> {
  /** 获取数据的请求方法 */
  request: CrudRequest<T, D>;
  /** 初始查询参数 (不包含分页) */
  initialParams?: D;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 页面挂载时是否自动请求 */
  autoRequest?: boolean;
  /** 子组件 */
  children: ReactNode;
}

/**
 * 请求函数的定义
 * 注意：我们约定 request 函数返回 Promise<PageResult<T>>
 * 也就是在传入组件前，你需要在 API 层把 ResponseResult 解包
 */
export type CrudRequest<T = any, D = any> = (
  params: D & { pageIndex: number; pageSize: number },
) => Promise<PageResult<T>>;
