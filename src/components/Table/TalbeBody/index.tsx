import { type Table as TableInstance } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

interface TableBodyProps<TData> {
  table: TableInstance<TData>;
}

export default function TableBody<TData>({ table }: TableBodyProps<TData>) {
  return (
    <>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
}
