import { getCookie, setCookie, deleteCookie } from "./cookie.ts";

const TOKEN_KEY = "mu-token";

export function hasToken() {
  return getCookie(TOKEN_KEY) !== null;
}

export function getToken() {
  return getCookie(TOKEN_KEY);
}

export function setToken(value: string) {
  return setCookie(TOKEN_KEY, value, { days: 1 });
}

export function removeToken() {
  return deleteCookie(TOKEN_KEY);
}
