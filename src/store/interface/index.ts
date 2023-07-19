import {RouteRecordRaw} from "vue-router"

export interface MenuOptions {
  path: string;
  title: string;
  redirect?: string
  meta: {
    title: string;
  },
  icon?: string;
  children?: MenuOptions[];
}

export interface MenuState {
  menuList: MenuOptions[];
  matchList: RouteRecordRaw[];
}

/**
 * tabs
 */
export interface tabsOption {
  key: string,
  title: string
}

/**
 * tokenInfo
 */
export interface TokenInfoModel {
  tokenName: string,
  tokenValue: string,
  isLogin: boolean,
  loginId: string,
  loginType: string,
  tokenTimeout: number,
  sessionTimeout: number,
  tokenSessionTimeout: number,
  tokenActivityTimeout: number,
  loginDevice: string,
  tag: string,
}

export interface UserStoreModel {
  id: string
  orgId: string
  nickname: string
  avatar: string
}
