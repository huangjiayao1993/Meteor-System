import {reactive} from "vue";
import {BtnAuth} from "@/components/table/index";

/**
 * 按钮权限
 */
class ConfigBtnAuth extends BtnAuth {
  constructor() {
    super();
    super.search = ['sys:config:list']
    super.create = ['sys:config:create']
    super.remove = ['sys:config:remove']
    super.rowEdit = ['sys:config:update']
    super.rowRemove = ['sys:config:remove']
    super.refreshCache = ['sys:config:refresh']
    super.cleanCache = ['sys:config:refresh']
  }
}
export const auth = reactive<ConfigBtnAuth>(new ConfigBtnAuth());

/**
 * 数据列
 */
export const columns: any = [
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: 'KEY键',
    dataIndex: 'key',
  },
  {
    title: 'VALUE值',
    dataIndex: 'value',
  },
  {
    title: '说明',
    dataIndex: 'desc',
  },
  {
    title: '操作',
    slot: 'action',
  },
];

/**
 * 表单校验规则
 */
export const rules: any = {
  key: [
    {required: true, message: '请输入KEY键'},
  ],
  value: [
    {required: true, message: '请输入VALUE值'},
  ]
}
