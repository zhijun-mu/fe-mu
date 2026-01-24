import { RouterProvider } from "react-router/dom";
import { router } from "@/routes";
import { message } from "antd";
import { setMessageApi } from "@/utils/message";

import "./styles/app.css";

export default function App() {
  const [messageApi, contextHolder] = message.useMessage();
  setMessageApi(messageApi);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}
