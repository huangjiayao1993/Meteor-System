import {reactive} from "vue";
import {BtnAuth} from "@/components/table/index";

/**
 * 按钮权限
 */
class DictBtnAuth extends BtnAuth {
  constructor() {
    super();
    super.search = ['sys:dict:list']
    super.create = ['sys:dict:create']
    super.remove = ['sys:dict:remove']
    super.rowEdit = ['sys:dict:update']
    super.rowRemove = ['sys:dict:remove']
    super.refreshCache = ['sys:dict:refresh']
    super.cleanCache = ['sys:dict:refresh']
  }
}
export const dictAuth = reactive<DictBtnAuth>(new DictBtnAuth());

/**
 * 数据列-字典类型
 */
export const dictTypeColumns: any = [
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '操作',
    slot: 'action',
  },
];

/**
 * 表单校验规则-字典类型
 */
export const dictTypeRules: any = {
  name: [
    {required: true, message: '请输入字典名称'},
  ],
  type: [
    {required: true, message: '请输入字典类型'},
  ]
}

/**
 * 数据列-字典数据
 */
export const dictDataColumns: any = [
  {
    title: '数据名称',
    dataIndex: 'name',
  },
  {
    title: '数据值',
    dataIndex: 'value',
  },
  {
    title: '操作',
    slot: 'action',
  },
];

/**
 * 表单校验规则-字典数据
 */
export const dictDataRules: any = {
  name: [
    {required: true, message: '请输入字典数据名称'},
  ],
  value: [
    {required: true, message: '请输入字典数据值'},
  ]
}
