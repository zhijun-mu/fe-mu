/**
 * CRUD 默认配置
 * 说明：
 * - 只放「稳定、不依赖业务」的常量
 * - 不放文案（文案应由上层决定）
 */

/** 默认分页大小 */
export const DEFAULT_PAGE_SIZE = 25;

/** 默认分页参数名 */
export const DEFAULT_PAGE_PARAMS = {
  current: "page",
  pageSize: "pageSize",
} as const;

/** 默认排序参数名 */
export const DEFAULT_SORT_PARAMS = {
  field: "sortField",
  order: "sortOrder",
} as const;

/** 默认请求节流时间（ms） */
export const DEFAULT_DEBOUNCE_DELAY = 300;

/** 默认列表 key 字段 */
export const DEFAULT_ROW_KEY = "id";

/** CRUD 内部 action 名称（领域级，不是 UI 文案） */
export const CRUD_ACTION = {
  SEARCH: "search",
  REFRESH: "refresh",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
} as const;

/** 空数据占位（用于 table / list） */
export const EMPTY_LIST: readonly any[] = Object.freeze([]);

/** 默认表单布局 */
export const DEFAULT_FORM_LAYOUT = "inline";

/** 默认查询参数（避免 undefined） */
export const DEFAULT_QUERY_PARAMS = Object.freeze({});
