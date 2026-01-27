import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import TableHeader from "@/components/Table/TableHeader";
import TableBody from "@/components/Table/TalbeBody";
import TablePagination from "@/components/Table/TablePagination";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export function Table<TData, TValue>({ data, columns }: TableProps<TData, TValue>) {
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
