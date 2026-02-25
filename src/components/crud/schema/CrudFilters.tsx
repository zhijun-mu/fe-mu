import { useForm } from "react-hook-form";

import type { CrudContextValue } from "../types";
import { useCrudConfig } from "../CrudPage";

import { Button } from "@/components/ui/button.tsx";

type Props<T> = {
  crud: CrudContextValue<T>;
};

export function CrudFilters<T>({ crud }: Props<T>) {
  const { filters } = useCrudConfig<T>();

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
