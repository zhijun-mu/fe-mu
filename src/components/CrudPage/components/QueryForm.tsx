import React, { useCallback, useEffect, useState } from "react";
import { useCrudContext } from "../context";
import type { RecordType } from "../types";

export interface QueryFormProps<TParams extends RecordType = RecordType> {
  /** 初始表单值（用于受控 or 回显） */
  initialValues?: Partial<TParams>;

  /** 提交前转换参数（如 trim / 合并字段） */
  transform?: (values: TParams) => TParams;

  /** 是否在挂载时自动查询 */
  autoSearch?: boolean;

  /** children 作为 render props，自由控制表单 UI */
  children?: (
    values: Partial<TParams>,
    onChange: (patch: Partial<TParams>) => void,
  ) => React.ReactNode;
}

/**
 * QueryForm
 * 职责：
 * - 管理“查询条件的 UI 状态”
 * - 调用 search(params)
 * - 不关心 request / table / 页面
 */
export function QueryForm<D extends RecordType = RecordType>(props: QueryFormProps<D>) {
  const { initialValues = {}, transform, autoSearch = false, children } = props;

  const { search, params } = useCrudContext<any, D>();

  const [values, setValues] = useState<Partial<D>>(initialValues);

  /**
   * 表单值变化（局部更新）
   */
  const onChange = useCallback((patch: Partial<D>) => {
    setValues((prev) => ({ ...prev, ...patch }));
  }, []);

  /**
   * 提交查询
   */
  const onSubmit = useCallback(() => {
    let nextParams = values as D;
    if (transform) {
      nextParams = transform(nextParams);
    }
    search(nextParams);
  }, [values, transform, search]);

  /**
   * reset：重置表单并触发查询
   */
  const onReset = useCallback(() => {
    setValues(initialValues);
    search(initialValues as D);
  }, [initialValues, search]);

  /**
   * 是否挂载即查询
   */
  useEffect(() => {
    if (autoSearch) {
      search(initialValues as D);
    }
  }, []);

  /**
   * 如果 CrudPage 中的 params 发生变化（例如外部 search）
   * 同步回表单（可选，但非常实用）
   */
  useEffect(() => {
    setValues(params);
  }, [params]);

  /**
   * 默认 UI（你可以完全不用）
   */
  if (!children) {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onSubmit}>查询</button>
        <button onClick={onReset}>重置</button>
      </div>
    );
  }

  /**
   * Render Props 模式
   */
  return <>{children(values, onChange)}</>;
}
