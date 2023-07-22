import {reactive} from "vue";
import {BtnAuth} from "@/components/table/index";

/**
 * 按钮权限-登录日志
 */
class LoginBtnAuth extends BtnAuth {
  constructor() {
    super();
    super.search = ['sys:log:login:list']
  }
}
export const loginAuth = reactive<LoginBtnAuth>(new LoginBtnAuth());

/**
 * 数据列-登录日志
 */
export const loginColumns: any = [
  {
    title: '账号',
    dataIndex: 'username',
  },
  {
    title: '登录方式',
    dataIndex: 'loginType',
  },
  {
    title: '时间',
    dataIndex: 'createTime',
  },
  {
    title: '登录状态',
    slot: 'success',
    dataIndex: 'success',
  },
  {
    title: '失败原因',
    dataIndex: 'reason',
  },
];

/**
 * 按钮权限-操作日志
 */
class operationBtnAuth extends BtnAuth {
  constructor() {
    super();
    super.search = ['sys:log:operation:list']
  }
}
export const operationAuth = reactive<operationBtnAuth>(new operationBtnAuth());

/**
 * 数据列-操作日志
 */
export const operationColumns: any = [
  {
    title: '账号',
    dataIndex: 'username',
  },
];