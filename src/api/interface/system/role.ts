import {PageModel} from "@/api/interface/base";

/**
 * 分页查询
 */
export class RolePageModel extends PageModel{
  name: string | null
  constructor(name = null) {
    super()
    this.name = name
  }
}

/**
 * 新增实体
 */
export class RoleEntity {
  id: string | null
  code: string | null
  name: string | null
  status: boolean
  constructor(id = null, code = null, name = null, status: boolean = false) {
    this.id = id
    this.code = code
    this.name = name
    this.status = status
  }
}

/**
 * 授权实体
 */
export class AuthorizeEntity {
  id: string | null
  authIds: string[]
  constructor(id = null, authIds = []) {
    this.id = id
    this.authIds = authIds
  }
}
