import {PageModel} from "@/api/interface/base";

/**
 * 分页查询
 */
export class ConfigPageModel extends PageModel{
  key: string | null
  constructor(key = null) {
    super()
    this.key = key
  }
}

/**
 * 新增实体
 */
export class ConfigEntity {
  id: string | null
  key: string | null
  value: string | null
  constructor(id = null, key = null, value = null) {
    this.id = id
    this.key = key
    this.value = value
  }
}
