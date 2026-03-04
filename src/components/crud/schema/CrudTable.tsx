import { useState } from "react";
import type { PaginationState, Table as TableInstance } from "@tanstack/react-table";
import type { CrudContextValue } from "../types";

import { DataTable } from "@/components/data-table";
import TablePagination from "@/components/data-table/table-pagination/index.tsx";
import { useCrudConfig } from "../context.ts";

type Props<T extends Record<string, any>> = {
  crud: CrudContextValue<T>;
};

export function CrudTable<T extends Record<string, any>>({ crud }: Props<T>) {
  const { columns } = useCrudConfig<T>();

  const [table, setTable] = useState<TableInstance<any> | null>(null);

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
    <div className="flex flex-1 min-h-0 h-full flex-col overflow-hidden bg-background">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <DataTable
          ref={(instance) => setTable(instance)}
          data={crud.data}
          columns={columns ?? []}
          pageCount={crud.page.pages}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        ></DataTable>
      </div>

      {table && (
        <div className="flex-none border-t pt-1.5 pb-1.5">
          <TablePagination table={table} />
        </div>
      )}
    </div>
  );
}
