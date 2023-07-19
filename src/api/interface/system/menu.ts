/**
 * 新增实体
 */
export class MenuEntity {
  id: string | null
  pid: string | null
  name: string | null
  type: number
  permission: string | null
  path: string | null
  componentPath: string | null
  icon: string | null
  sort: number
  constructor(id = null, pid = null, name = null, type: number = 0, permission = null, path = '', componentPath = null, icon = null, sort: number = 0) {
    this.id = id
    this.pid = pid
    this.name = name
    this.type = type
    this.permission = permission
    this.path = path
    this.componentPath = componentPath
    this.icon = icon
    this.sort = sort
  }
}
