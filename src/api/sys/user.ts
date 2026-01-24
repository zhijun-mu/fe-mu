import { post } from "@/utils/request";

/**
 * 分页查询用户列表
 * 对应 Controller: /sys/user/page
 */
export function getUserPage(data: any) {
  return post("/sys/user/page", data);
}

/**
 * 获取用户详情
 * 对应 Controller: /sys/user/get
 */
export function getUser(id: number) {
  return post("/sys/user/get", { id });
}

/**
 * 新增用户
 * 对应 Controller: /sys/user/add
 */
export function addUser(data: any) {
  return post("/sys/user/add", data);
}

/**
 * 更新用户
 * 对应 Controller: /sys/user/update
 */
export function updateUser(data: any) {
  return post("/sys/user/update", data);
}

/**
 * 批量删除用户
 * 对应 Controller: /sys/user/remove
 */
export function removeUser(ids: number[]) {
  return post("/sys/user/remove", { ids });
}

/**
 * 停用用户
 * 对应 Controller: /sys/user/disable
 */
export function disableUser(id: number) {
  return post("/sys/user/disable", { id });
}

/**
 * 启用用户
 * 对应 Controller: /sys/user/enable
 */
export function enableUser(id: number) {
  return post("/sys/user/enable", { id });
}
