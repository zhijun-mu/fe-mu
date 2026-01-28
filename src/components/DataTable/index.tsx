import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import TableHeader from "@/components/DataTable/TableHeader";
import TableBody from "@/components/DataTable/TalbeBody";
import TablePagination from "@/components/DataTable/TablePagination";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({ data, columns }: TableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
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
