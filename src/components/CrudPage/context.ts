import { createContext, useContext } from "react";
import type { CrudContextValue, RecordType } from "@/components/CrudPage/types.ts";

export const CrudContext = createContext<CrudContextValue<any, any> | null>(null);

// 消费者 Hook
export function useCrudContext<T, D extends RecordType>() {
  const context = useContext(CrudContext);
  if (!context) {
    throw new Error("useCrudContext 必须在 <CrudPage> 标签内使用。");
  }

  return context as CrudContextValue<T, D>;
}
