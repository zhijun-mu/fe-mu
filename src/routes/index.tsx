import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import AdminLayout from "@/layouts/AdminLayout";
import NotFound from "@/components/not-found";

import LoginPage from "@/pages/login";
import lazyLoad from "@/routes/lazyLoad.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "home",
        element: lazyLoad(lazy(() => import("@/pages/home"))),
      },
      {
        path: "sys",
        children: [
          { path: "user", element: lazyLoad(lazy(() => import("@/pages/sys/user"))) },
          { path: "role", element: lazyLoad(lazy(() => import("@/pages/sys/role"))) },
          { path: "login-log", element: lazyLoad(lazy(() => import("@/pages/sys/login-log"))) },
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
    element: lazyLoad(lazy(() => import("@/pages/example"))),
  },
  { path: "*", element: <NotFound /> },
]);
