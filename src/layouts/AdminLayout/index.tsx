import { Navigate, Outlet, useLocation, useNavigate } from "react-router";

import type { ReactNode } from "react";
import { useAuthStore } from "@/stores";

import { Dropdown } from "antd";
import { type MenuDataItem, ProLayout } from "@ant-design/pro-components";
import { LogoutOutlined } from "@ant-design/icons";

import defaultProps from "./_defaultProps";

import { logout } from "@/api/auth.ts";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo, clearAuth } = useAuthStore.getState();

  const handleLogout = () => {
    logout().finally(() => {
      clearAuth();
      navigate("/login", { replace: true });
    });
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const menuItemRender = (item: MenuDataItem, dom: ReactNode) => {
    return (
      <div
        onClick={() => {
          navigate(item.path || "/");
        }}
      >
        {dom}
      </div>
    );
  };

  const avatarProps: any = {
    src: !userInfo.avatar
      ? "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
      : userInfo.avatar,
    size: "small",
    title: userInfo.name,
    render: (_: any, dom: any) => {
      return (
        <Dropdown
          menu={{
            items: [
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "退出登录",
                onClick: handleLogout,
              },
            ],
          }}
        >
          {dom}
        </Dropdown>
      );
    },
  };

  return (
    <>
      <ProLayout
        {...defaultProps}
        avatarProps={avatarProps}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={menuItemRender}
      >
        <Outlet />
      </ProLayout>
    </>
  );
}
