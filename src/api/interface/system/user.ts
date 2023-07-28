import {PageModel} from "@/api/interface/base";
import {Dayjs} from "dayjs";

/**
 * 分页查询
 */
export class UserPageModel extends PageModel {
  orgId: string | null
  nickname: string | null

  constructor() {
    super()
    this.orgId = null
    this.nickname = null
  }
}

/**
 * 新增实体
 */
export class UserEntity {
  id: string | null
  orgId: string | null
  username: string | null
  password: string | null
  newPassword: string | null
  nickname: string | null
  realname: string | null
  mobile: string | null
  avatar: string | null
  gender: boolean
  status: boolean
  regTime: string | null
  enableUsed: boolean
  enableStartTime: string | null | Dayjs
  enableEndTime: string | null | Dayjs
  version: string | null

  constructor() {
    this.id = null
    this.orgId = null
    this.username = null
    this.password = null
    this.newPassword = null
    this.nickname = null
    this.realname = null
    this.mobile = null
    this.avatar = null
    this.gender = false
    this.status = false
    this.regTime = null
    this.enableUsed = false
    this.enableStartTime = null
    this.enableEndTime = null
    this.version = null
  }
}
