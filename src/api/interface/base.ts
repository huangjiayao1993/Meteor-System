/**
 * 分页查询基类
 */
export class PageModel {
  current: number;
  pageSize: number;
  total: number;
  // showTotal: Function;

  constructor() {
    this.current = 1;
    this.pageSize = 10;
    this.total = 0;
    // this.showTotal = (total: number) => `总数 ${total} 条`;
  }
}
