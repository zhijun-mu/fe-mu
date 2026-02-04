import type { ReactNode } from "react";
import { createContext, useMemo } from "react";

import type { CrudApi, CrudColumn } from "./types.ts";
import { CrudProvider } from "./CrudProvider.tsx";

export type CrudPageConfig<T> = {
  title?: ReactNode;
  columns?: CrudColumn<T>[];
  filters?: any[]; // 你后续可换成 CrudFilterSchema[]
  form?: any[]; // 你后续可换成 CrudFieldSchema[]
  selectable?: boolean;
  pageSizeOptions?: number[];
};

const CrudConfigContext = createContext<CrudPageConfig<any> | null>(null);

export type CrudPageProps<T> = {
  api?: CrudApi<T>;
  columns?: CrudColumn<T>[];
};

export function CrudPage<T>(props: CrudPageProps<T>) {
  const { api, columns } = props;

  const config = useMemo<CrudPageConfig<T>>(() => ({ columns }), [columns]);

  return (
    <CrudProvider<T> api={api}>
      <CrudConfigContext.Provider value={config}></CrudConfigContext.Provider>
    </CrudProvider>
  );
}
