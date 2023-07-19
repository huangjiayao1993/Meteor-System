import request from '@/api/index'

export default {
  /**
   * 获取当前用户信息和权限
   */
  current: () => request.GET('/auth/current')
}