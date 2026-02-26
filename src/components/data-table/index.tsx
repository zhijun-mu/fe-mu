import {
  type ColumnDef,
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
}

export function DataTable<TData, TValue>({ data, columns }: TableProps<TData, TValue>) {
  const cols = (columns || []).map((column) => ({
    accessorKey: column.dataIndex,
    header: column.title,
  })) as ColumnDef<TData, TValue>[];

  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
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
