import type { ReactNode } from "react";
import type { PageResult } from "@/types/api.ts";

export type RecordType = Record<string, any>;

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

export interface CrudColumn<T = RecordType> {
  title: string;
  dataIndex: keyof T;
  width?: number | string;
  render?: (value: any, record: T) => ReactNode;
}

export type CrudContextValue<T> = {
  data: T[];
};
