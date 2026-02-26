import { useForm } from "react-hook-form";

import type { CrudContextValue } from "../types";
import { useCrudConfig } from "../context.ts";

import { Button } from "@/components/ui/button.tsx";

type Props<T> = {
  crud: CrudContextValue<T>;
};

export function CrudFilters<T>({ crud }: Props<T>) {
  const { filters } = useCrudConfig<T>();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values: any) => {
    crud.onFilter(values);
  };

  const handleReset = () => {
    reset(); // 清理前端 UI 的 Form 状态
    crud.onReset(); // 清理并重置后端的查询参数
  };

  if (!Array.isArray(filters) || filters.length === 0) return null;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {filters.map((field) => {
          return (
            <label key={field.name}>
              {field.label}
              <input type="text" {...register(field.name)} />
            </label>
          );
        })}

        <Button type="submit">查询</Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          重置
        </Button>
      </form>
    </div>
  );
}
