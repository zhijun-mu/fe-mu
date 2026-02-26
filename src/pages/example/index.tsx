import { DataTable } from "@/components/data-table";
import { Field, FieldLabel } from "@/components/ui/field.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";

export default function ExamplePage() {
  const data = [
    {
      id: "1",
      name: "张三",
      email: "zhangsan@example.com",
      role: "Admin",
      status: "Active",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "李四",
      email: "lisi@example.com",
      role: "Editor",
      status: "Active",
      createdAt: "2024-01-05",
    },
    {
      id: "3",
      name: "王五",
      email: "wangwu@example.com",
      role: "User",
      status: "Inactive",
      createdAt: "2024-02-10",
    },
    {
      id: "4",
      name: "赵六",
      email: "zhaoliu@example.com",
      role: "User",
      status: "Active",
      createdAt: "2024-02-15",
    },
    {
      id: "5",
      name: "孙七",
      email: "sunqi@example.com",
      role: "Editor",
      status: "Inactive",
      createdAt: "2024-03-01",
    },
  ];

  return (
    <>
      <h1>example</h1>
      <DataTable
        data={data}
        columns={[
          {
            dataIndex: "name", // 对应数据中的 key
            title: "姓名",
          },
          {
            dataIndex: "email",
            title: "邮箱",
          },
          {
            dataIndex: "role",
            title: "角色",
            // 自定义渲染示例
            cell: ({ row }) => {
              const role = row.getValue("role") as string;
              return <span className="font-bold text-blue-600">{role}</span>;
            },
          },
          {
            dataIndex: "status",
            title: "状态",
            cell: ({ row }) => {
              const status = row.getValue("status") as string;
              return (
                <span className={status === "Active" ? "text-green-500" : "text-red-500"}>
                  {status === "Active" ? "启用" : "禁用"}
                </span>
              );
            },
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
          },
        ]}
      ></DataTable>

      <div className="flex items-center justify-between gap-4">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">每页行数</FieldLabel>
          <Select defaultValue="25">
            <SelectTrigger className="w-20" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
