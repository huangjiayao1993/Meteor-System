import {reactive} from "vue";
import {BtnAuth} from "@/components/table/index";

/**
 * 按钮权限
 */
class RoleBtnAuth extends BtnAuth {
  authorize: string[]
  constructor() {
    super();
    super.search = ['sys:role:list']
    super.create = ['sys:role:create']
    super.remove = ['sys:role:remove']
    super.rowEdit = ['sys:role:update']
    super.rowRemove = ['sys:role:remove']
    this.authorize = ['sys:role:menu:authorize']
  }
}
export const auth = reactive<RoleBtnAuth>(new RoleBtnAuth());

/**
 * 数据列
 */
export const columns: any = [
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '角色标识',
    dataIndex: 'code',
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
  name: [
    {required: true, message: '请输入角色名称'},
    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入角色标识'},
    {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
  ]
}
