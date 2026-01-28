import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { router } from "@/routes";
import { useAuthStore } from "@/stores";
import { AuthError, NetworkError } from "@/errors";
import type { ResponseResult } from "@/types/api";

import { toast } from "sonner";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.MU_BASE_URL,
  timeout: 6000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.skipAuth) return config;

    config.headers = config.headers ?? {};
    config.headers["X-TOKEN"] = useAuthStore.getState().token;

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ResponseResult<any>>) => {
    // 二进制数据直接返回
    const responseType = response.config.responseType;
    if (responseType === "blob" || responseType === "arraybuffer") {
      return response.data;
    }

    const { code, data, message } = response.data;

    if (code === 0) return data;

    if (code === 1101) {
      useAuthStore.getState().clearAuth();
      router.navigate("/login", { replace: true }).then(() => {});
    } else {
      toast.error(message || "未知错误！");
    }

    return Promise.reject(new AuthError(message));
  },
  (err) => {
    let { message } = err;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    toast.error(message);
    return Promise.reject(new NetworkError(message));
  },
);

function post<T = any, D = any>(url: string, data?: any, config?: AxiosRequestConfig<D>) {
  return instance.post<ResponseResult<T>>(url, data, config) as unknown as Promise<T>;
}

export default instance;
export { post };
