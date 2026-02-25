import { type ReactNode } from "react";
import { createContext, useState, useMemo, useContext, useCallback, useEffect } from "react";

import type { CrudApi, CrudContextValue, CrudPageParams } from "./types.ts";

type CrudProviderProps<T> = {
  api?: CrudApi<T>;
  children: ReactNode;
};

const CrudContext = createContext<CrudContextValue<any> | null>(null);

export function CrudProvider<T>({ api, children }: CrudProviderProps<T>) {
  const initialParams = {
    pageIndex: 1,
    pageSize: 25,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState({
    total: 0,
    pages: 0,
    ...initialParams,
  });
  const [queryParams, setQueryParams] = useState<CrudPageParams>(initialParams);

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

  const onSearch = useCallback((searchParams: Record<string, any>) => {
    setQueryParams((prev: any) => ({
      pageIndex: prev.pageIndex,
      pageSize: prev.pageSize,
      ...searchParams,
    }));
  }, []);

  const onReset = useCallback(() => {
    setQueryParams((prev: CrudPageParams) => ({
      pageIndex: 1,
      pageSize: prev.pageSize,
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
      queryParams,
      onSearch,
      onReset,
    }),
    [data, page, loading, queryParams, onSearch, onReset],
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
