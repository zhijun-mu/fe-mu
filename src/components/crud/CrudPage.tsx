import { type ReactNode } from "react";
import { useMemo } from "react";

import type { CrudApi, CrudFilterSchema } from "./types.ts";
import { CrudConfigContext } from "./context.ts";
import { CrudProvider } from "./CrudProvider.tsx";
import { CrudQuerySlot, CrudTableSlot } from "./slots";
import type { ColumnsType } from "@/components/data-table/types.ts";

export type CrudPageConfig<T> = {
  title?: ReactNode;
  columns?: ColumnsType<any, T>[];
  filters?: any[]; // 你后续可换成 CrudFilterSchema[]
  form?: any[]; // 你后续可换成 CrudFieldSchema[]
  selectable?: boolean;
  pageSizeOptions?: number[];
};

export type CrudPageProps<T> = {
  api?: CrudApi<T>;
  columns?: ColumnsType<any, T>[];
  filters?: CrudFilterSchema[];
};

export function CrudPage<T>(props: CrudPageProps<T>) {
  const { api, columns, filters } = props;

  const config = useMemo<CrudPageConfig<T>>(() => ({ columns, filters }), [columns, filters]);

  return (
    <CrudProvider<T> api={api}>
      <CrudConfigContext.Provider value={config}>
        <CrudQuerySlot></CrudQuerySlot>
        <CrudTableSlot></CrudTableSlot>
      </CrudConfigContext.Provider>
    </CrudProvider>
  );
}
