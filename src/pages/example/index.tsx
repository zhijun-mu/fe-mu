import { Table } from "@/components/Table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

// 业务代码示例
type Person = {
  name: string;
  age: number;
};

const columns: ColumnDef<Person>[] = [
  { accessorKey: "name", header: "姓名" },
  { accessorKey: "age", header: "年龄" },
];

// 1. 在组件外部生成 999 条模拟数据
const generateData = (count: number): Person[] => {
  return Array.from({ length: count }, (_, i) => ({
    name: `用户 ${i + 1}`,
    age: Math.floor(Math.random() * 40) + 20, // 随机 20-60 岁
  }));
};

const allData = generateData(999);

export default function ExamplePage() {
  // 2. 使用 useMemo 锁定数据引用，防止不必要的 Table 重新计算
  const data = useMemo(() => allData, []);

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
}
