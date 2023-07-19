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

  constructor(search = ['list'], create = ['create'], remove = ['remove'], refreshCache = ['refreshCache'],cleanCache = ['cleanCache'], rowEdit = ['rowEdit'],rowRemove = ['rowRemove']) {
    this.search = search
    this.create = create
    this.remove = remove
    this.refreshCache = refreshCache
    this.cleanCache = cleanCache
    this.rowEdit = rowEdit
    this.rowRemove = rowRemove
  }
}
