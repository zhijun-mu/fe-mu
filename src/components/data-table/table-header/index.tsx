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
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
