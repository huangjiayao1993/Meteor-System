import {PageModel} from "@/api/interface/base";

/**
 * 分页查询-字典类型
 */
export class DictTypePageModel extends PageModel{
  name: string | null
  constructor(name = null) {
    super()
    this.name = name
  }
}

/**
 * 新增实体-字典类型
 */
export class DictTypeEntity {
  id: string | null
  name: string | null
  type: string | null
  constructor(id = null, name = null, type = null) {
    this.id = id
    this.name = name
    this.type = type
  }
}

/**
 * 分页查询-字典数据
 */
export class DictDataPageModel extends PageModel{
  type: string | null
  name: string | null
  constructor(type = null, name = null) {
    super()
    this.type = type
    this.name = name
  }
}

/**
 * 新增实体-字典数据
 */
export class DictDataEntity {
  id: string | null
  type: string | null
  name: string | null
  value: string | null
  constructor(id = null, type = null, name = null, value = null) {
    this.id = id
    this.type = type
    this.name = name
    this.value = value
  }
}
