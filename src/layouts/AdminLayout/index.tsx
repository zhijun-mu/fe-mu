import { Navigate, Outlet } from "react-router";

import { ProLayout } from "@ant-design/pro-components";

import defaultProps from "./_defaultProps";
import avatarProps from "./_avatarProps.tsx";

import { hasToken } from "@/utils/token.ts";

export default function AdminLayout() {
  if (!hasToken()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <ProLayout {...defaultProps} avatarProps={avatarProps}>
        <Outlet />
      </ProLayout>
    </>
  );
}
