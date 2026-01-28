import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/DataTable";

import { page } from "@/api/sys/user";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field.tsx";

const columns: ColumnDef<any>[] = [
  { accessorKey: "name", header: "姓名" },
  { accessorKey: "username", header: "用户名" },
];

export default function SysUserPage() {
  const [data, setData] = useState<object[]>([]);

  const loadTableData = () => {
    page({
      pageNum: 1,
      pageSize: 10,
    }).then((data) => {
      setData(data.list);
    });
  };

  useEffect(() => {
    loadTableData();
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <FieldGroup className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            <Field className="grid grid-cols-[80px_1fr] items-center gap-2">
              <FieldLabel htmlFor="fieldgroup-name" className="text-right text-muted-foreground">
                Name
              </FieldLabel>
              <Input id="fieldgroup-name" placeholder="Jordan Lee" className="h-9" />
            </Field>
            <Field className="grid grid-cols-[80px_1fr] items-center gap-2">
              <FieldLabel htmlFor="fieldgroup-email" className="text-right text-muted-foreground">
                Email
              </FieldLabel>
              <Input
                id="fieldgroup-email"
                type="email"
                placeholder="name@example.com"
                className="h-9"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="h-2" />

      <Card>
        <DataTable data={data} columns={columns} />
      </Card>
    </>
  );
}
