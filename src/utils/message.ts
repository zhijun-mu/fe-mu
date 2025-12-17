import type { ReactNode } from "react";
import type { MessageInstance } from "antd/es/message/interface";

let messageApi: MessageInstance | null = null;

export function setMessageApi(api: MessageInstance) {
  messageApi = api;
}
export function info(content: ReactNode) {
  messageApi?.info(content);
}

export function error(content: ReactNode) {
  messageApi?.error(content);
}
