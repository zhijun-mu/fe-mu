import { type CrudFilterSchema, CrudPage } from "@/components/crud";

import { page } from "@/api/sys/role";

export default function SysRolePage() {
  const filters: CrudFilterSchema[] = [
    {
      label: "角色编码",
      name: "roleCode",
      type: "text",
    },
    {
      label: "角色名称",
      name: "roleName",
      type: "text",
    },
  ];

  return (
    <>
      <CrudPage
        api={{ page: page }}
        filters={filters}
        columns={[
          { dataIndex: "roleCode", title: "角色编码", width: 200 },
          { dataIndex: "roleName", title: "角色名称", width: 200 },
          { dataIndex: "sortNo", title: "排序号", width: 80 },
          { dataIndex: "disabled", title: "状态", width: 100 },
          { dataIndex: "remark", title: "备注", minWidth: 200 },
        ]}
      ></CrudPage>
    </>
  );
}
