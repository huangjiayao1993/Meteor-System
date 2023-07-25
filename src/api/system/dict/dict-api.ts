import request from '@/api';
import { PageModel } from "@/api/interface/base";
import { DictDataEntity, DictTypeEntity } from "@/api/interface/system/dict";

export default {
  /**
   * 刷新缓存
   */
  refresh: () => request.POST('/system/dict/refresh'),
  /**
   * 清空缓存
   */
  clean: () => request.POST('/system/dict/clean'),
  /**
   * 分页-字典类型
   * @param params
   */
  typePage: (params: PageModel) => request.GET('/system/dict/type/page', params),
  /**
   * 新增-字典类型
   * @param data
   */
  typeCreate: (data: DictTypeEntity) => request.POST('/system/dict/type/create', data),
  /**
   * 更新-字典类型
   * @param data
   */
  typeUpdate: (data: DictTypeEntity) => request.PUT('/system/dict/type/update', data),
  /**
   * 删除-字典类型
   * @param data
   */
  typeRemove: (data: any) => request.DELETE('/system/dict/type/remove', {ids: data}),
  /**
   * 分页-字典数据
   * @param params
   */
  dataPage: (params: PageModel) => request.GET('/system/dict/data/page', params),
  /**
   * 新增-字典数据
   * @param data
   */
  dataCreate: (data: DictDataEntity) => request.POST('/system/dict/data/create', data),
  /**
   * 更新-字典数据
   * @param data
   */
  dataUpdate: (data: DictDataEntity) => request.PUT('/system/dict/data/update', data),
  /**
   * 删除-字典数据
   * @param data
   */
  dataRemove: (data: any) => request.DELETE('/system/dict/data/remove', {ids: data})
}
