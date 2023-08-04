import {BtnAuth} from "@/components/table/index";
import {reactive} from "vue";

/**
 * 按钮权限
 */
class OrgBtnAuth extends BtnAuth {
  constructor() {
    super();
    super.search = ['sys:org:list']
    super.create = ['sys:org:create']
    super.remove = ['sys:org:remove']
    super.rowEdit = ['sys:org:update']
    super.rowRemove = ['sys:org:remove']
  }
}
export const auth = reactive<OrgBtnAuth>(new OrgBtnAuth());

/**
 * 数据列
 */
export const columns: any = [
  {
    title: '组织名称',
    dataIndex: 'name',
  },
  {
    title: '分类',
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
export const orgTypeOptions: any = [
  {
    label: '部门',
    value: 0,
    color: 'cyan'
  },
  {
    label: '公司',
    value: 1,
    color: 'blue'
  }
]

/**
 * 表单校验规则
 */
export const rules: any = {
  name: [
    {required: true, message: '请输入组织名称'},
    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
  ],
  type: [
    {required: true, message: '请选择分类'},
  ]
}
