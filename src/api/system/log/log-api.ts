import request from '@/api'
import {PageModel} from "@/api/interface/base";

export default {
  /**
   * 分页-登录日志
   * @param params
   */
  loginPage: (params: PageModel) => request.GET('/system/log/login/page', params),
  /**
   * 分页-操作日志
   * @param params
   */
  operationPage: (params: PageModel) => request.GET('/system/log/operation/page', params),
}
