import {PageModel} from "@/api/interface/base";

/**
 * 分页查询
 */
export class OrgPageModel extends PageModel {
  id: string | null
  name: string | null

  constructor() {
    super()
    this.id = null
    this.name = null
  }
}

/**
 * 新增实体
 */
export class OrgEntity {
  id: string | null
  pid: string | null
  name: string | null
  type: number
  sort: number

  constructor() {
    this.id = null
    this.pid = null
    this.name = null
    this.type = 0
    this.sort = 0
  }
}
