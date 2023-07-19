import {PageModel} from "@/api/interface/base";

/**
 * 分页查询
 */
export class OrgPageModel extends PageModel{
  id: string | null
  name: string | null
  constructor(id = null, name = null) {
    super()
    this.id = id
    this.name = name
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
  constructor(id = null, pid = null, name = null, type: number = 0, sort: number = 0) {
    this.id = id
    this.pid = pid
    this.name = name
    this.type = type
    this.sort = sort
  }
}
