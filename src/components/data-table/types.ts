import type { ReactNode } from "react";
import type { CellContext } from "@tanstack/react-table";

export interface ColumnsType<TData, TValue> {
  title: string;
  dataIndex: string;
  cell?: (info: CellContext<TData, TValue>) => ReactNode;
  // cell?:
  //   | string
  //   | ((props: {
  //       table: Table<TData>;
  //       row: Row<TData>;
  //       column: Column<TData>;
  //       cell: Cell<TData, TValue>;
  //       getValue: () => any;
  //       renderValue: () => any;
  //     }) => unknown);
}
