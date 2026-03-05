import type { ReactNode } from "react";
import type { CellContext } from "@tanstack/react-table";

export interface ColumnsType<TData, TValue> {
  title: string;
  dataIndex: string;
  cell?: (info: CellContext<TData, TValue>) => ReactNode;
  // 新增：宽度控制属性，支持数字(px)或字符串(如 "100px", "50%")
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
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
