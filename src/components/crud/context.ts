import { createContext, useContext } from "react";
import type { CrudContextValue } from "./types.ts";
import type { CrudPageConfig } from "@/components/crud/CrudPage.tsx";

export const CrudContext = createContext<CrudContextValue<any> | null>(null);

export function useCrud<T>() {
  const context = useContext(CrudContext);
  if (!context) {
    throw new Error("useCrud 必须在 <CrudProvider> 标签内使用。");
  }
  return context as CrudContextValue<T>;
}

export const CrudConfigContext = createContext<CrudPageConfig<any> | null>(null);

export function useCrudConfig<T>() {
  const context = useContext(CrudConfigContext);
  if (!context) throw new Error("useCrudConfig 必须在 <CrudPage> 标签内使用。");
  return context as CrudPageConfig<T>;
}
