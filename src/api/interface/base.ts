/**
 * 分页查询基类
 */
export class PageModel {
  current: number;
  pageSize: number;
  total: number;
  // showTotal: Function;
  constructor(current: number = 1, pageSize: number = 10, total: number = 0) {
    this.current = current;
    this.pageSize = pageSize;
    this.total = total;
    // this.showTotal = (total: number) => `总数 ${total} 条`;
  }
}
