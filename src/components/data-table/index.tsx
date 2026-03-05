import { type ForwardedRef, forwardRef, type ReactElement, useImperativeHandle } from "react";
import {
  type ColumnDef,
  type PaginationState,
  type OnChangeFn,
  type Table as TableInstance,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import TableHeader from "@/components/data-table/table-header";
import TableBody from "@/components/data-table/table-body";
import type { ColumnsType } from "@/components/data-table/types.ts";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnsType<TData, TValue>[];
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

function DataTableInner<TData, TValue>(
  { data, columns, pageCount, pagination, onPaginationChange }: TableProps<TData, TValue>,
  ref: ForwardedRef<TableInstance<TData>>,
) {
  const cols = (columns || []).map((column) => ({
    accessorKey: column.dataIndex,
    header: column.title,
    meta: {
      width: column.width,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
    },
    ...(column.cell !== undefined && { cell: column.cell }),
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

  // 将 table 实例暴露给外部 ref
  useImperativeHandle(ref, () => table, [table]);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table style={{ width: "100%", minWidth: "max-content", tableLayout: "fixed" }}>
        <TableHeader table={table} />
        <TableBody table={table} />
      </table>

      {/*<TablePagination table={table} />*/}
    </div>
  );
}

// 核心修正：使用类型转换来保持泛型支持，解决 JSX 组件识别错误
export const DataTable = forwardRef(DataTableInner) as <TData, TValue>(
  props: TableProps<TData, TValue> & { ref?: ForwardedRef<TableInstance<TData>> },
) => ReactElement;
