import {GlobalStore} from "@/store";
import {UserStore} from "@/store/modules/user";
import {TokenInfoModel, UserStoreModel} from "@/store/interface";

/**
 * 清除用户信息、权限、token
 */
export const cleanUserToken = () => {
  const globalStore = GlobalStore();
  globalStore.setTokenInfo(<TokenInfoModel>{});
  const userStore = UserStore();
  userStore.setUser(<UserStoreModel>{});
  userStore.setPermissions(<any>[]);
  userStore.setRoles(<any>[]);
}
