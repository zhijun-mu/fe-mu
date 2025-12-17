import { post } from "@/utils/request";
export function passwordLogin(data: any) {
  return post("/sys/auth/password-login", data, { skipAuth: true });
}
