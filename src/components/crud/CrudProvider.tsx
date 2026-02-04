import { type ReactNode } from "react";
import { createContext, useState, useMemo, useContext, useCallback, useEffect } from "react";

import type { CrudApi, CrudContextValue, CrudPageParams, CrudQueryParams } from "./types.ts";

type CrudProviderProps<T> = {
  api?: CrudApi<T>;
  children: ReactNode;
};

const CrudContext = createContext<CrudContextValue<any> | null>(null);

export function CrudProvider<T>({ api, children }: CrudProviderProps<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 25,
    pages: 0,
  });
  const [queryParams, setQueryParams] = useState<CrudPageParams>({
    pageIndex: 1,
    pageSize: 25,
  });

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

  useEffect(() => {
    loadTable().then(() => {});
  }, [loadTable]);

  const value: CrudContextValue<T> = useMemo(
    () => ({
      data,
      page,
      loading,
      queryParams,
    }),
    [data, page, loading, queryParams],
  );

  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
}

export function useCrud<T>() {
  const context = useContext(CrudContext);
  if (!context) {
    throw new Error("useCrud must be used inside <CrudProvider>");
  }
  return context as CrudContextValue<T>;
}
