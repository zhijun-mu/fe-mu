import type { PageResult } from "@/types/api.ts";

export type RecordType = Record<string, any>;
export type FilterType = "text" | "select" | "date" | "number";

export type CrudPageParams = {
  pageIndex: number;
  pageSize: number;
};

export type CrudQueryParams<D extends RecordType = RecordType> = CrudPageParams & D;

export type CrudApi<T> = {
  page?: (queryParams: CrudPageParams) => Promise<PageResult<T>>;
  add?: (values: Partial<T>) => Promise<any>;
  update?: (id: string | number, values: Partial<T>) => Promise<any>;
  remove?: (id: string | number) => Promise<any>;
};

// export interface CrudColumn<T = RecordType> {
//   title: string;
//   dataIndex: keyof T;
//   width?: number | string;
//   render?: (value: any, record: T) => ReactNode;
// }

export interface CrudFilterSchema {
  label: string;
  name: string; // 对应后端接口的查询参数 key
  type: FilterType;
  placeholder?: string;
  options?: { label: string; value: any }[]; // 供 select 使用
  props?: Record<string, any>; // 传递给具体 UI 组件的额外属性
}

export type CrudContextValue<T> = {
  data: T[];
  onSearch: (searchParams: RecordType) => void;
  onReset: () => void;
};
