import request from '@/api'
import {PageModel} from "@/api/interface/base";
import {AuthorizeEntity, RoleEntity} from "@/api/interface/system/role";

export default {
  /**
   * 分页
   * @param params
   */
  page: (params: PageModel) => request.GET('/system/role/page', params),
  /**
   * 列表
   */
  list: () => request.GET('/system/role/list'),
  /**
   * 新增
   * @param data
   */
  create: (data: RoleEntity) => request.POST('/system/role/create', data),
  /**
   * 更新
   * @param data
   */
  update: (data: RoleEntity) => request.PUT('/system/role/update', data),
  /**
   * 删除
   * @param data
   */
  remove: (data: any) => request.DELETE('/system/role/remove', {ids: data}),
  /**
   * 授权
   * @param data
   */
  authorize: (data: AuthorizeEntity) => request.POST('/system/role/authorize', data),
  /**
   * 根据用户ID获取角色
   * @param userId
   */
  listByUserId: (userId: string) => request.GET('/system/role/list/by/user/id', {userId: userId}),
}
