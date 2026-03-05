import type { CSSProperties } from "react";
import type { Table as TableInstance } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import styles from "./index.module.scss";

interface TableHeaderProps<TData> {
  table: TableInstance<TData>;
}

export default function TableHeader<TData>({ table }: TableHeaderProps<TData>) {
  return (
    <thead className={styles.thead}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            // 核心步骤：从 meta 中取出宽度配置
            const meta = header.column.columnDef.meta as any;
            const cellStyle: CSSProperties = {
              width: meta?.width ?? meta?.minWidth, // 变化在这里
              minWidth: meta?.minWidth,
              maxWidth: meta?.maxWidth,
            };

            return (
              // 核心步骤：将 style 挂载到 th 元素上
              <th key={header.id} style={cellStyle}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
