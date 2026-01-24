import { createBrowserRouter, Navigate } from "react-router";

import AdminLayout from "@/layouts/AdminLayout";
import NotFound from "@/components/not-found";
import HomePage from "@/pages/home";
import SysUserPage from "@/pages/sys/user";
import SysRolePage from "@/pages/sys/role";
import LoginPage from "@/pages/login";
import ExamplePage from "@/pages/example";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      {
        path: "sys",
        children: [
          { path: "user", element: <SysUserPage /> },
          { path: "role", element: <SysRolePage /> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "example",
    element: <ExamplePage />,
  },
  { path: "*", element: <NotFound /> },
]);
