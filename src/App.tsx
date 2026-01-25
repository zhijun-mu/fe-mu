import { RouterProvider } from "react-router/dom";
import { router } from "@/routes";

import { Toaster } from "@/components/ui/sonner";

import "./styles/app.css";

export default function App() {

  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}
