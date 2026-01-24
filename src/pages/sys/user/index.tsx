import {
  PageContainer,
  ProTable,
  ModalForm,
  ProFormText,
  ProFormDigit,
  ProFormRadio,
} from "@ant-design/pro-components";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// 引入你刚才生成的 service
import {
  getUserPage,
  addUser,
  updateUser,
  removeUser,
  enableUser,
  disableUser,
} from "@/api/sys/user";
import { useRef, useState } from "react";

export default function SysUserPage() {
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>(undefined);

  // --- 1. 数据请求适配 ---

  // 获取列表
  const handleQuery = async (params: any) => {
    // 转换参数适配后端
    const body = {
      pageNum: params.current,
      pageSize: params.pageSize,
      username: params.username,
      name: params.name,
      disabled: params.disabled,
    };

    const res: any = await getUserPage(body);
    return {
      data: res.list || [],
      total: res.total || 0,
      success: true,
    };
  };

  // --- 2. 交互逻辑 ---

  // 提交表单 (新增或编辑)
  const handleFinish = async (values: any) => {
    try {
      if (currentRow) {
        // 编辑模式：补全 ID
        await updateUser({ ...values, id: currentRow.id });
        message.success("更新成功");
      } else {
        // 新增模式
        await addUser(values);
        message.success("创建成功");
      }
      setModalVisible(false);
      actionRef.current?.reload(); // 刷新表格
      return true;
    } catch (error) {
      return false;
    }
  };

  // 删除用户
  const handleDelete = async (id: number) => {
    try {
      // 后端接口接收的是 ids 数组: { ids: [1] }
      await removeUser([id]);
      message.success("删除成功");
      actionRef.current?.reload();
    } catch (error) {
      // ignore
    }
  };

  // 切换状态 (启用/停用)
  const handleStatusChange = async (checked: boolean, row: any) => {
    try {
      if (checked) {
        // 开启 -> 调用启用接口
        await enableUser(row.id);
        message.success(`已启用用户 ${row.username}`);
      } else {
        // 关闭 -> 调用停用接口
        await disableUser(row.id);
        message.success(`已停用用户 ${row.username}`);
      }
      actionRef.current?.reload();
    } catch (error) {
      // 失败则刷新回原状态
      actionRef.current?.reload();
    }
  };

  // --- 3. 表格列定义 ---
  const columns: ProColumns<any>[] = [
    {
      title: "序号",
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "账号",
      dataIndex: "username",
      copyable: true,
      formItemProps: {
        rules: [{ required: true, message: "请输入账号" }],
      },
    },
    {
      title: "姓名",
      dataIndex: "name",
      formItemProps: {
        rules: [{ required: true, message: "请输入姓名" }],
      },
    },
    {
      title: "排序",
      dataIndex: "sortNo",
      search: false,
      width: 80,
    },
    {
      title: "状态",
      dataIndex: "disabled",
      valueType: "select",
      // 用于搜索栏的下拉选项
      valueEnum: {
        0: { text: "启用", status: "Success" },
        1: { text: "停用", status: "Error" },
      },
      // 自定义表格列的渲染：使用 Switch 开关
      render: (_, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="停用"
          // 后端 0 是启用，所以 checked = (disabled === 0)
          checked={record.disabled === 0}
          onChange={(checked) => handleStatusChange(checked, record)}
        />
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      search: false,
      editable: false,
      width: 160,
    },
    {
      title: "操作",
      valueType: "option",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <a
            key="edit"
            onClick={() => {
              setCurrentRow(record);
              setModalVisible(true);
            }}
          >
            编辑
          </a>
          <Popconfirm
            key="delete"
            title="确定要删除该用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: "#ff4d4f" }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="id"
        request={handleQuery}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setCurrentRow(undefined);
              setModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建用户
          </Button>,
        ]}
      />

      <ModalForm
        title={currentRow ? "编辑用户" : "新建用户"}
        width="500px"
        open={modalVisible}
        onOpenChange={setModalVisible}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setCurrentRow(undefined),
        }}
        // 设置表单初始值
        initialValues={
          currentRow || {
            sortNo: 1,
            disabled: 0, // 默认启用
          }
        }
        onFinish={handleFinish}
      >
        <ProFormText
          name="username"
          label="账号"
          placeholder="请输入登录账号"
          rules={[{ required: true, message: "请输入账号" }]}
          // 编辑模式下通常不允许修改账号，如果允许则去掉 readonly
          readonly={!!currentRow}
        />

        {/* 密码：新增时必填，编辑时选填 */}
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder={currentRow ? "如不修改请留空" : "请输入密码"}
          rules={[
            {
              required: !currentRow, // 只有新增时必填
              message: "请输入密码",
            },
          ]}
        />

        <ProFormText
          name="name"
          label="姓名"
          placeholder="请输入真实姓名"
          rules={[{ required: true, message: "请输入姓名" }]}
        />

        <ProFormDigit name="sortNo" label="排序号" min={0} fieldProps={{ precision: 0 }} />

        <ProFormRadio.Group
          name="disabled"
          label="状态"
          options={[
            { label: "启用", value: 0 },
            { label: "停用", value: 1 },
          ]}
          rules={[{ required: true }]}
        />
      </ModalForm>
    </PageContainer>
  );
}
