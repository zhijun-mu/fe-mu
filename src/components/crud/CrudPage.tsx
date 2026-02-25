import { type ReactNode } from "react";
import { useMemo } from "react";

import type { CrudApi, CrudColumn, CrudFilterSchema } from "./types.ts";
import { CrudConfigContext } from "./context.ts";
import { CrudProvider } from "./CrudProvider.tsx";
import { CrudQuerySlot } from "./slots/CrudQuerySlot.tsx";

export type CrudPageConfig<T> = {
  title?: ReactNode;
  columns?: CrudColumn<T>[];
  filters?: any[]; // 你后续可换成 CrudFilterSchema[]
  form?: any[]; // 你后续可换成 CrudFieldSchema[]
  selectable?: boolean;
  pageSizeOptions?: number[];
};

export type CrudPageProps<T> = {
  api?: CrudApi<T>;
  columns?: CrudColumn<T>[];
  filters?: CrudFilterSchema[];
};

export function CrudPage<T>(props: CrudPageProps<T>) {
  const { api, columns, filters } = props;

  const config = useMemo<CrudPageConfig<T>>(() => ({ columns, filters }), [columns, filters]);

  return (
    <CrudProvider<T> api={api}>
      <CrudConfigContext.Provider value={config}>
        <CrudQuerySlot></CrudQuerySlot>
      </CrudConfigContext.Provider>
    </CrudProvider>
  );
}
