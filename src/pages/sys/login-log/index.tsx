import { CrudPage } from "@/components/crud";
import { page } from "@/api/sys/login-log";

export default function SysLoginLogPage() {
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
        ]}
        columns={[
          { dataIndex: "username", title: "用户名" },
          { dataIndex: "name", title: "姓名" },
          { dataIndex: "ip", title: "IP" },
          { dataIndex: "deviceName", title: "设备名称" },
          { dataIndex: "osName", title: "系统名称" },
          {
            dataIndex: "isFailed",
            title: "状态",
            cell: (info) => {
              console.log(info)
              // 1. 获取当前单元格的值 (即当前行的 isFailed 字段的值)
              // 假设 isFailed 是个布尔值
              const isFailed = info.getValue<boolean>();

              // 2. 根据状态返回不同的 ReactNode (这里结合了 Tailwind CSS 样式)
              if (isFailed) {
                return (
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    失败
                  </span>
                );
              }

              return (
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  成功
                </span>
              );
            },
          },
          { dataIndex: "loginTime", title: "登录时间" },
        ]}
      ></CrudPage>
    </>
  );
}
