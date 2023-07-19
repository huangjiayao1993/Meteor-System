import {createPinia, defineStore} from "pinia";
// pinia 持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {getLocalStorageParse, setLocalStorage} from "@/utils/storage";
import {TokenInfoModel} from "@/store/interface";

const tokenInfoKey: string = "tokenInfo"

export const GlobalStore = defineStore({
  id: "GlobalStore",
  state: () => {
    return {
      // tokenInfo
      tokenInfo: <TokenInfoModel>getLocalStorageParse(tokenInfoKey) || <TokenInfoModel>{},
      // collapsed
      isCollapsed: false,
      // dark theme
      // isDark: getLocalStorageParse("GlobalStore")?.isDark || false
      isDark: true
    }
  },
  getters: {},
  actions: {
    setTokenInfo(tokenInfo: TokenInfoModel) {
      setLocalStorage(tokenInfoKey, tokenInfo)
      this.tokenInfo = tokenInfo;
    },
    setCollapsed() {
      this.isCollapsed = !this.isCollapsed;
    },
    setTheme() {
      this.isDark = !this.isDark
    }
  },
  persist: true
})


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
