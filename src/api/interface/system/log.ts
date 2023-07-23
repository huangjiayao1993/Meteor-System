import {PageModel} from "@/api/interface/base";

/**
 * 分页查询-登录日志
 */
export class LoginPageModel extends PageModel{
  username: string | null
  constructor(username = null) {
    super()
    this.username = username
  }
}

/**
 * 分页查询-操作日志
 */
export class OperationPageModel extends PageModel{
  username: string | null
  constructor(username = null) {
    super()
    this.username = username
  }
}