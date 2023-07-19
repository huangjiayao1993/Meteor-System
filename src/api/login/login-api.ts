import request from '@/api/index'
import {LoginForm} from '@/api/interface/login/login'

export default {
  /**
   * 登录
   * @param data
   */
  login: (data: LoginForm) => request.POST('/auth/login', data),
  /**
   * 注销
   */
  logout: () => request.DELETE('/auth/logout'),
}
