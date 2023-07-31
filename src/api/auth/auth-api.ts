import request from '@/api/index'
import {LoginForm} from "@/api/interface/login/login";

export default {
  /**
   * 获取验证码
   */
  captcha: () => request.GET('/auth/captcha'),
  /**
   * 登录
   * @param data
   */
  login: (data: LoginForm) => request.POST('/auth/login', data),
  /**
   * 注销
   */
  logout: () => request.DELETE('/auth/logout'),
  /**
   * 获取当前用户信息和权限
   */
  current: () => request.GET('/auth/current')
}
