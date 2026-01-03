import { Navigate, Outlet, useLocation, useNavigate } from "react-router";

import type { ReactNode } from "react";
import { type MenuDataItem, ProLayout } from "@ant-design/pro-components";

import defaultProps from "./_defaultProps";
import avatarProps from "./_avatarProps.tsx";

import { hasToken } from "@/utils/token.ts";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!hasToken()) {
    return <Navigate to="/login" replace />;
  }

  const menuItemRender = (item: MenuDataItem, dom: ReactNode) => {
    return (
      <div
        onClick={() => {
          if (item.path) {
            navigate(item.path);
          }
        }}
      >
        {dom}
      </div>
    );
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
