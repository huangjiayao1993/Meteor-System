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

  constructor() {
    this.id = null
    this.pid = null
    this.name = null
    this.type = 0
    this.permission = null
    this.path = ''
    this.componentPath = null
    this.icon = null
    this.sort = 0
  }
}
