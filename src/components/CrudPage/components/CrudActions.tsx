import React from "react";
import { useCrudContext } from "../context";
import type { RecordType } from "../types";

export interface CrudActionsRenderProps<TData extends RecordType> {
  data: TData[];
  reload: () => void;
}

export interface CrudActionsProps<TData extends RecordType = RecordType> {
  children?: (ctx: CrudActionsRenderProps<TData>) => React.ReactNode;
}

/**
 * CrudActions
 *
 * 职责：
 * - 为“操作区”提供 CRUD 能力
 * - 不内置任何具体业务按钮
 * - 通过 render props 暴露最小必要能力
 */
export function CrudActions<TData extends RecordType = RecordType>(props: CrudActionsProps<TData>) {
  const { children } = props;

  const { dataSource, refresh } = useCrudContext<TData, RecordType>();

  if (!children) return null;

  return (
    <>
      {children({
        data: dataSource,
        reload: refresh,
      })}
    </>
  );
}
