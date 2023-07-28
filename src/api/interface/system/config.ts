import {PageModel} from "@/api/interface/base";

/**
 * 分页查询
 */
export class ConfigPageModel extends PageModel {
  key: string | null

  constructor() {
    super()
    this.key = null
  }
}

/**
 * 新增实体
 */
export class ConfigEntity {
  id: string | null
  key: string | null
  value: string | null

  constructor() {
    this.id = null
    this.key = null
    this.value = null
  }
}
