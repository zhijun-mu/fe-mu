import { type ReactNode, useContext } from "react";
import { createContext, useMemo } from "react";

import type { CrudApi, CrudColumn, CrudFilterSchema } from "./types.ts";
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

const CrudConfigContext = createContext<CrudPageConfig<any> | null>(null);

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

export function useCrudConfig<T>() {
  const context = useContext(CrudConfigContext);
  if (!context) throw new Error("useCrudConfig must be used within CrudPage");
  return context as CrudPageConfig<T>;
}
