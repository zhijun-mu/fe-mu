import { createBrowserRouter } from "react-router";

import AdminLayout from "@/layouts/AdminLayout";
import NotFound from "@/components/not-found";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import ExamplePage from "@/pages/example";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/example",
    element: <ExamplePage />,
  },
  { path: "*", element: <NotFound /> },
]);
