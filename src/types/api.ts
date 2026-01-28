// 通用分页数据结构（泛型）
export interface PageResult<T> {
  list: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  pages: number;
}

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
