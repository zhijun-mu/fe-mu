import { useForm } from "react-hook-form";

import type { CrudContextValue } from "../types";
import { useCrudConfig } from "../context.ts";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Field, FieldLabel } from "@/components/ui/field.tsx";

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
    <div className="p-1.5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-center gap-4">
        {filters.map((field) => {
          return (
            <Field orientation="horizontal" className="w-fit" key={field.name}>
              <FieldLabel className="whitespace-nowrap">
                {field.label}
                <Input className="h-8 text-xs" {...register(field.name)} />
              </FieldLabel>
            </Field>
          );
        })}

        <div className="flex items-center gap-2">
          <Button type="submit" size="sm">
            查询
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={handleReset}>
            重置
          </Button>
        </div>
      </form>
    </div>
  );
}
