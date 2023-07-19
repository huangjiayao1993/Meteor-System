import {BtnAuth} from "@/components/table/index";
import {reactive} from "vue";

/**
 * 按钮权限
 */
class UserBtnAuth extends BtnAuth {
  authorize: string[]
  resetPassword: string[]
  updatePassword: string[]
  constructor() {
    super();
    super.search = ['sys:user:list']
    super.create = ['sys:user:create']
    super.remove = ['sys:user:remove']
    super.rowEdit = ['sys:user:update']
    super.rowRemove = ['sys:user:remove']
    this.authorize = ['sys:user:role:authorize']
    this.resetPassword = ['sys:user:resetPassword']
    this.updatePassword = ['sys:user:updatePassword']
  }
}
export const auth = reactive<UserBtnAuth>(new UserBtnAuth());

/**
 * 数据列
 */
export const columns: any = [
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
  },
  {
    title: '真实姓名',
    dataIndex: 'realname',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
  },
  {
    title: '头像',
    slot: 'avatar',
    dataIndex: 'avatar',
  },
  {
    title: '状态',
    slot: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作',
    slot: 'action',
  },
];

/**
 * 性别
 */
export const genderOptions: any = [
  {
    label: '女',
    value: false
  },
  {
    label: '男',
    value: true
  }
]

/**
 * 密码校验规则
 */
const passwordRules: any = [
  {min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'}
]

/**
 * 表单校验规则
 */
export const rules: any = {
  orgId: [
    {required: true, message: '请选择组织'},
  ],
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    ...passwordRules
  ],
  nickname: [
    {required: true, message: '请输入用户昵称', trigger: 'blur'},
    {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
  ],
  realname: [
    {required: true, message: '请输入真实姓名', trigger: 'blur'},
    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
  ],
  mobile: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur"}
  ]
}

/**
 * 修改密码表单校验规则
 */
export const updatePasswordRules: any = {
  password: [
    {required: true, message: '请输入原密码', trigger: 'blur'},
    ...passwordRules
  ],
  newPassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    ...passwordRules
  ],
}