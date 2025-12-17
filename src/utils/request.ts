import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { router } from "@/routes";
import { hasToken, getToken, removeToken } from "./token";
import { error } from "./message";

/**
 * 后端响应信息主体
 */
export interface ResponseResult<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
  timestamp: number;
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.MU_BASE_URL,
  timeout: 6000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.skipAuth) return config;

    if (hasToken()) {
      config.headers = config.headers ?? {};
      config.headers["X-TOKEN"] = getToken();
    }

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
    const { code, data, message } = response.data;

    if (code === 0) return data;

    switch (code) {
      case 1101:
        removeToken();
        router.navigate("/login", { replace: true }).then(() => {});
    }
    error(message || "未知错误！");
    throw new Error(message || "未知错误！");
  },
  (error) => {
    // 可以在这里统一处理错误
    console.error("请求失败:", error);
    return Promise.reject(error);
  },
);

function post<T = any, D = any>(url: string, data?: any, config?: AxiosRequestConfig<D>) {
  return instance.post<ResponseResult<T>>(url, data, config);
}

export default instance;
export { post };
