import { post } from "@/utils/request";

export function passwordLogin(data: any) {
  return post("/sys/auth/password-login", data, { skipAuth: true });
}

export function getLoginInfo() {
  return post("/sys/auth/get-user-info");
}

export function logout() {
  return post("/sys/auth/logout");
}
