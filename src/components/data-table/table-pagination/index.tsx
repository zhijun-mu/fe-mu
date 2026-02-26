import type { Table as TableInstance } from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Field, FieldLabel } from "@/components/ui/field.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TablePaginationProps<TData> {
  table: TableInstance<TData>;
}

export default function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  return (
    <>
      <Pagination className="p-1.5 justify-end">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <FieldLabel>
              共 <strong>{table.getPageCount().toLocaleString()} </strong>页
            </FieldLabel>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              href={!table.getCanPreviousPage() ? undefined : "#"}
              className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined}
              aria-disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            />
          </PaginationItem>
          <PaginationItem>
            <strong>{table.getState().pagination.pageIndex + 1} </strong>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              size="sm"
              href={!table.getCanNextPage() ? undefined : "#"}
              className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
              aria-disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            />
          </PaginationItem>
          <PaginationItem>
            <Field orientation="horizontal" className="w-fit">
              <FieldLabel>每页</FieldLabel>
              <Select
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-20" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    {[25, 50, 100].map((pageSize) => (
                      <SelectItem key={pageSize} value={String(pageSize)}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldLabel>条</FieldLabel>
            </Field>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
