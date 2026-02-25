import { useId } from "react";
import { useForm } from "react-hook-form";

import type { CrudContextValue } from "../types";
import { useCrudConfig } from "../CrudPage";

import { Button } from "@/components/ui/button.tsx";

type Props<T> = {
  crud: CrudContextValue<T>;
};

export function CrudFilters<T>({ crud }: Props<T>) {
  const { filters } = useCrudConfig<T>();

  const baseId = useId();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values: any) => {
    (crud as any).onSearch?.(values);
    crud.onSearch(values);
  };

  const handleReset = () => {
    reset();
    (crud as any).onReset?.();
  };

  if (!Array.isArray(filters) || filters.length === 0) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {filters.map((field) => {
          const fieldId = `${baseId}-${field.name}`;

          return (
            <div key={field.name}>
              <label htmlFor={fieldId}>{field.label}</label>
              <input id={fieldId} type="text" {...register(field.name)} />
            </div>
          );
        })}

        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button type="submit">查询</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            重置
          </Button>
        </div>
      </form>
    </div>
  );
}
