import {defineStore} from "pinia";
import {getLocalStorage, getLocalStorageParse, setLocalStorage} from "@/utils/storage";
import {UserStoreModel} from "@/store/interface";

const userKey: string = "User"
const permissionsKey: string = "Permissions"
const rolesKey: string = "Roles"

export const UserStore = defineStore({
  id: "UserStore",
  state: () => ({
    user: <UserStoreModel>getLocalStorageParse(userKey) || <UserStoreModel>{},
    permissions: getLocalStorage(permissionsKey) || [],
    roles: getLocalStorage(rolesKey) || [],
  }),
  getters: {},
  actions: {
    setUser(user: UserStoreModel) {
      setLocalStorage(userKey, user)
      this.user = user;
    },
    setPermissions(permissions: Array<string>) {
      setLocalStorage(permissionsKey, permissions)
      this.permissions = permissions;
    },
    setRoles(roles: Array<string>) {
      setLocalStorage(rolesKey, roles)
      this.roles = roles;
    },
  },
  persist: true,
});
