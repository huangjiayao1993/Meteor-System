import request from '@/api'
import {PageModel} from "@/api/interface/base";
import {OrgEntity} from "@/api/interface/system/org";

export default {
  /**
   * 分页
   * @param params
   */
  page: (params: PageModel) => request.GET('/system/org/page', params),
  /**
   * 树形
   * @param params
   */
  tree: (params: OrgEntity) => request.GET('/system/org/tree', params),
  /**
   * 新增
   * @param data
   */
  create: (data: OrgEntity) => request.POST('/system/org/create', data),
  /**
   * 更新
   * @param data
   */
  update: (data: OrgEntity) => request.PUT('/system/org/update', data),
  /**
   * 删除
   * @param data
   */
  remove: (data: any) => request.DELETE('/system/org/remove', {ids: data})
}
