import {
  type ColumnDef,
  type PaginationState,
  type OnChangeFn,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import TableHeader from "@/components/data-table/table-header";
import TableBody from "@/components/data-table/table-body";
import TablePagination from "@/components/data-table/table-pagination";
import type { ColumnsType } from "@/components/data-table/types.ts";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnsType<TData, TValue>[];
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  pagination,
  onPaginationChange,
}: TableProps<TData, TValue>) {
  const cols = (columns || []).map((column) => ({
    accessorKey: column.dataIndex,
    header: column.title,
  })) as ColumnDef<TData, TValue>[];

  // 判断是否传入了 pagination，如果是，则说明接管了分页（服务端分页）
  const isControlled = pagination !== undefined;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: isControlled,
    pageCount: isControlled ? pageCount : undefined,
    state: isControlled ? { pagination } : undefined,
    onPaginationChange: onPaginationChange,
  });

  return (
    <>
      <table>
        <TableHeader table={table} />
        <TableBody table={table} />
      </table>

      <TablePagination table={table} />
    </>
  );
}
