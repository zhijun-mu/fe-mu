import { type CrudFilterSchema, CrudPage } from "@/components/crud";

import { page } from "@/api/sys/role";

export default function SysRolePage() {
  const filters: CrudFilterSchema[] = [
    {
      label: "姓名",
      name: "name",
      type: "text",
    },
    {
      label: "性别",
      name: "sex",
      type: "text",
    },
  ];
  return (
    <>
      <CrudPage api={{ page: page }} filters={filters}></CrudPage>
    </>
  );
}
