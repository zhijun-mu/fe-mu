import { CrudPage } from "@/components/CrudPage";
import { QueryForm } from "@/components/CrudPage/components/QueryForm.tsx";
import { page } from "@/api/sys/user";

export default function SysUserPage() {
  return (
    <>
      <CrudPage request={page}>
        <QueryForm>
          {(values, onChange) => (
            <div className="flex items-center gap-4 p-4 bg-gray-50 mb-4 rounded">
              {/* 1. 用户名: String */}
              <label className="flex items-center text-sm">
                用户名:
                <input
                  className="border ml-2 p-1 rounded"
                  placeholder="输入账号"
                  value={values.username || ""}
                  onChange={(e) => onChange({ username: e.target.value })}
                />
              </label>

              {/* 2. 姓名: String (新增) */}
              <label className="flex items-center text-sm">
                姓名:
                <input
                  className="border ml-2 p-1 rounded"
                  placeholder="输入真实姓名"
                  value={values.name || ""}
                  onChange={(e) => onChange({ name: e.target.value })}
                />
              </label>

              {/* 3. 状态: Integer (新增，0启用|1停用) */}
              <label className="flex items-center text-sm">
                状态:
                <select
                  className="border ml-2 p-1 rounded w-24 bg-white"
                  /* 注意：0 是 falsy 值，必须使用 ?? "" 而不是 || ""，否则 0 会变成空 */
                  value={values.disabled ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    // 转换逻辑：空字符串 -> undefined (不传给后端)，否则转为数字
                    onChange({ disabled: val === "" ? undefined : Number(val) });
                  }}
                >
                  <option value="">全部</option>
                  <option value="0">启用</option>
                  <option value="1">停用</option>
                </select>
              </label>

              <div className="ml-auto flex gap-2">
                <button className="px-4 py-1 bg-blue-500 text-white rounded">查询</button>

                <button className="px-4 py-1 bg-gray-200 rounded">重置</button>
              </div>
            </div>
          )}
        </QueryForm>
      </CrudPage>
    </>
  );
}
