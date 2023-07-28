import request from '@/api';
import {PageModel} from "@/api/interface/base";
import {ConfigEntity} from '@/api/interface/system/config';

export default {
  /**
   * 刷新缓存
   */
  refresh: () => request.POST('/system/config/refresh'),
  /**
   * 清空缓存
   */
  clean: () => request.POST('/system/config/clean'),
  /**
   * 分页
   * @param params
   */
  page: (params: PageModel) => request.GET('/system/config/page', params),
  /**
   * 新增
   * @param data
   */
  create: (data: ConfigEntity) => request.POST('/system/config/create', data),
  /**
   * 更新
   * @param data
   */
  update: (data: ConfigEntity) => request.PUT('/system/config/update', data),
  /**
   * 删除
   * @param data
   */
  remove: (data: any) => request.DELETE('/system/config/remove', {ids: data})
}
