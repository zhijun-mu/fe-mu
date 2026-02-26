import type { CrudContextValue } from "../types";

import { DataTable } from "@/components/data-table";
import { useCrudConfig } from "../context.ts";

type Props<T extends Record<string, any>> = {
  crud: CrudContextValue<T>;
};

export function CrudTable<T extends Record<string, any>>({ crud }: Props<T>) {
  const { columns } = useCrudConfig<T>();

  return (
    <>
      <DataTable data={crud.data} columns={columns ?? []}></DataTable>
    </>
  );
}
