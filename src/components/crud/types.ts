import type { PageResult } from "@/types/api.ts";

// 1. 保留基础字典类型兜底，但我们尽量在核心逻辑中用泛型替代它
export type RecordType = Record<string, any>;
export type FilterType = "text" | "select" | "date" | "number";

// 2. 【纯净】分页参数 (职责极度明确)
export interface CrudPageParams {
  pageIndex: number;
  pageSize: number;
}

// 3. 【完整】请求参数 = 分页参数 + 业务过滤参数 (泛型 Q 代表 Query)
export type CrudQueryParams<Q = RecordType> = CrudPageParams & Q;

// 4. API 接口定义：引入泛型 T(列表实体) 和 Q(查询表单结构)
export interface CrudApi<T, Q = RecordType> {
  // 强制 page 方法必须接收 “分页+查询” 的完整类型
  page?: (params: CrudQueryParams<Q>) => Promise<PageResult<T>>;
  add?: (values: Partial<T>) => Promise<any>;
  update?: (id: string | number, values: Partial<T>) => Promise<any>;
  remove?: (id: string | number) => Promise<any>;
}

export interface CrudFilterSchema {
  label: string;
  name: string;
  type: FilterType;
  placeholder?: string;
  options?: { label: string; value: any }[];
  props?: RecordType;
}

// 5. Context 上下文状态：同样引入 T 和 Q 进行类型收窄
export interface CrudContextValue<T, Q = RecordType> {
  data: T[];
  loading: boolean;

  // 完整的当前分页状态
  page: {
    total: number;
    pages: number;
    pageIndex: number;
    pageSize: number;
  };

  // --- 核心动作分类且参数明确 ---
  // 过滤：只接收业务查询字段 (比如 { username: '张三' })，Partial 表示可以传部分字段
  onFilter: (filters: Partial<Q>) => void;
  // 重置：不需要参数
  onReset: () => void;
  // 翻页：只接收分页参数 (比如 { pageIndex: 2, pageSize: 20 })
  onPaginate: (pagination: CrudPageParams) => void;
}
