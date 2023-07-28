/**
 * 按钮权限基类
 */
export class BtnAuth {
  search?: string[]
  create?: string[]
  remove?: string[]
  refreshCache?: string[]
  cleanCache?: string[]
  rowEdit?: string[]
  rowRemove?: string[]

  constructor() {
    this.search = ['list']
    this.create = ['create']
    this.remove = ['remove']
    this.refreshCache = ['refreshCache']
    this.cleanCache = ['cleanCache']
    this.rowEdit = ['rowEdit']
    this.rowRemove = ['rowRemove']
  }
}
