import request from '@/api'
import {PageModel} from "@/api/interface/base";
import {UserEntity} from "@/api/interface/system/user";
import {AuthorizeEntity} from "@/api/interface/system/role";

export default {
  /**
   * 分页
   * @param params
   */
  page: (params: PageModel) => request.GET('/system/user/page', params),
  /**
   * 新增
   * @param data
   */
  create: (data: UserEntity) => request.POST('/system/user/create', data),
  /**
   * 更新
   * @param data
   */
  update: (data: UserEntity) => request.PUT('/system/user/update', data),
  /**
   * 删除
   * @param data
   */
  remove: (data: any) => request.DELETE('/system/user/remove', {ids: data}),
  /**
   * 授权
   * @param data
   */
  authorize: (data: AuthorizeEntity) => request.POST('/system/user/authorize', data),
  /**
   * 重置密码
   * @param data
   */
  resetPassword: (data: any) => request.PUT('/system/user/reset/password', {ids: data}),
  /**
   * 修改密码
   * @param data
   */
  changePassword: (data: UserEntity) => request.PUT('/system/user/change/password', data),
  /**
   * 修改状态
   * @param data
   */
  changeStatus: (data: UserEntity) => request.PUT('/system/user/change/status', data),
}
