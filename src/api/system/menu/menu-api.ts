import request from '@/api'
import {MenuEntity} from "@/api/interface/system/menu";

export default {
  /**
   * 当前用户菜单
   */
  currentUserMenu: () => request.GET('/system/menu/current/user/menu'),
  /**
   * 树形
   */
  tree: () => request.GET('/system/menu/tree'),
  /**
   * 新增
   * @param data
   */
  create: (data: MenuEntity) => request.POST('/system/menu/create', data),
  /**
   * 更新
   * @param data
   */
  update: (data: MenuEntity) => request.PUT('/system/menu/update', data),
  /**
   * 删除
   * @param data
   */
  remove: (data: any) => request.DELETE('/system/menu/remove', {ids: data}),
  /**
   * 根据角色ID获取菜单
   * @param roleId
   */
  listByRoleId: (roleId: string) => request.GET('/system/menu/list/by/role/id', {roleId: roleId}),
}
