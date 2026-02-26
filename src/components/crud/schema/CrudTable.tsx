import type { CrudContextValue } from "../types";

import { DataTable } from "@/components/data-table";
import { useCrudConfig } from "../context.ts";
import type { PaginationState } from "@tanstack/react-table";

type Props<T extends Record<string, any>> = {
  crud: CrudContextValue<T>;
};

export function CrudTable<T extends Record<string, any>>({ crud }: Props<T>) {
  const { columns } = useCrudConfig<T>();

  const pagination: PaginationState = {
    pageIndex: crud.page.pageIndex - 1,
    pageSize: crud.page.pageSize,
  };

  const handlePaginationChange = (
    updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState),
  ) => {
    const newPagination =
      typeof updaterOrValue === "function" ? updaterOrValue(pagination) : updaterOrValue;

    // 专属的分页逻辑，再也不会覆盖掉表单搜索条件了
    crud.onPaginate({
      pageIndex: newPagination.pageIndex + 1,
      pageSize: newPagination.pageSize,
    });
  };

  return (
    <>
      <DataTable
        data={crud.data}
        columns={columns ?? []}
        pageCount={crud.page.pages}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      ></DataTable>
    </>
  );
}
