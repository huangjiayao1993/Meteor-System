import {PageModel} from "@/api/interface/base";
import {Dayjs} from "dayjs";

/**
 * 分页查询
 */
export class UserPageModel extends PageModel{
  orgId: string|null
  nickname: string|null
  constructor(orgId = null, nickname = null) {
    super()
    this.orgId = orgId
    this.nickname = nickname
  }
}

/**
 * 新增实体
 */
export class UserEntity {
  id: string|null
  orgId: string|null
  username: string|null
  password: string|null
  newPassword: string|null
  nickname: string|null
  realname: string|null
  mobile: string|null
  avatar: string|null
  gender: boolean
  status: boolean
  regTime: string|null
  enableUsed: boolean
  enableStartTime: string|null|Dayjs
  enableEndTime: string|null|Dayjs
  version: string|null
  constructor(id = null, orgId = null, username = null, password = null, newPassword = null, nickname = null, realname = null, mobile = null, avatar = null, gender = false, status = false, regTime = null, enableUsed = false, enableStartTime = null, enableEndTime = null, version = null) {
    this.id = id
    this.orgId = orgId
    this.username = username
    this.password = password
    this.newPassword = newPassword
    this.nickname = nickname
    this.realname = realname
    this.mobile = mobile
    this.avatar = avatar
    this.gender = gender
    this.status = status
    this.regTime = regTime
    this.enableUsed = enableUsed
    this.enableStartTime = enableStartTime
    this.enableEndTime = enableEndTime
    this.version = version
  }
}
