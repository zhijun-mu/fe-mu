import { post } from "@/utils/request";
import type { PageResult } from "@/types/api.ts";

export function page(data: object) {
  return post<PageResult<object>>("/sys/role/page", data);
}
