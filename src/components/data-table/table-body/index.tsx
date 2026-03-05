import type { CSSProperties } from "react";
import { type Table as TableInstance } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

interface TableBodyProps<TData> {
  table: TableInstance<TData>;
}

export default function TableBody<TData>({ table }: TableBodyProps<TData>) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            // 核心步骤：从 meta 中取出宽度配置
            const meta = cell.column.columnDef.meta as any;
            const cellStyle: CSSProperties = {
              width: meta?.width ?? meta?.minWidth, // 变化在这里
              minWidth: meta?.minWidth,
              maxWidth: meta?.maxWidth,
            };

            return (
              // 核心步骤：将 style 挂载到 td 元素上
              <td key={cell.id} style={cellStyle}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
