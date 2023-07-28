import {PageModel} from "@/api/interface/base";

/**
 * 分页查询
 */
export class RolePageModel extends PageModel {
  name: string | null

  constructor() {
    super()
    this.name = null
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

  constructor() {
    this.id = null
    this.code = null
    this.name = null
    this.status = false
  }
}

/**
 * 授权实体
 */
export class AuthorizeEntity {
  id: string | null
  authIds: string[]

  constructor() {
    this.id = null
    this.authIds = []
  }
}
