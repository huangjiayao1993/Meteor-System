import {reactive} from "vue";
import {BtnAuth} from "@/components/table/index";

/**
 * 按钮权限
 */
class MenuBtnAuth extends BtnAuth {
  constructor() {
    super();
    super.create = ['sys:menu:create']
    super.remove = ['sys:menu:remove']
    super.rowEdit = ['sys:menu:update']
    super.rowRemove = ['sys:menu:remove']
  }
}
export const auth = reactive<MenuBtnAuth>(new MenuBtnAuth());

/**
 * 数据列
 */
export const columns: any = [
  {
    title: '菜单名称',
    dataIndex: 'name',
  },
  {
    title: '类型',
    slot: 'type',
    dataIndex: 'type',
  },
  {
    title: '序号',
    dataIndex: 'sort',
  },
  {
    title: '操作',
    slot: 'action',
  },
];

/**
 * 组织类型
 */
export const menuTypeOptions: any = [
  {
    label: '目录',
    value: 0,
    color: 'cyan'
  },
  {
    label: '菜单',
    value: 1,
    color: 'blue'
  },
  {
    label: '按钮',
    value: 2,
    color: 'red'
  }
]

/**
 * 表单校验规则
 */
export const rules: any = {
  name: [
    {required: true, message: '请输入菜单名称'},
    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
  ],
  type: [
    {required: true, message: '请选择类型'},
  ],
  permission: [
    {required: true, message: '请输入权限标识'},
    {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur'}
  ],
  path: [
    {required: true, message: '请输入访问地址'},
  ],
  componentPath: [
    {required: true, message: '请输入组件地址'},
  ]
}
