import { CrudPage } from "@/components/crud";

import { page } from "@/api/sys/user";

export default function SysUserPage() {
  return (
    <>
      <CrudPage
        api={{ page: page }}
        filters={[
          {
            label: "用户名",
            name: "username",
            type: "text",
          },
          {
            label: "姓名",
            name: "name",
            type: "text",
          },
        ]}
        columns={[
          { dataIndex: "username", title: "用户名" },
          { dataIndex: "name", title: "姓名" },
        ]}
      ></CrudPage>
    </>
  );
}
