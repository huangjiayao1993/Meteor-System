/**
 * 登录基类表单
 */
export interface LoginForm {
  loginType: string;
}

/**
 * 用户名登录表单
 */
export interface UsernameLoginForm extends LoginForm {
  username: string;
  password: string;
}

/**
 * 手机号验证码登录表单
 */
export interface MobileLoginForm extends LoginForm {
  mobile: string;
  code: string;
}

