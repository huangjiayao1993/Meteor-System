import {defineStore} from "pinia";
import MenuApi from '@/api/system/menu/menu-api';
import matchRouter from "@/routers/permissionList"
import {staticRouter} from "@/routers/allRouter"
import router from "@/routers";
import {routes, notFound} from "@/routers/router";

export const MenuStore = defineStore({
  id: "MenuStore",
  state: () => ({
    // 后端传的菜单列表
    menuList: <any>[],
    // 过滤后的菜单列表
    matchList: <any>[],
    // 缓存的路由
    storageRouter: <any>[],
  }),
  getters: {},
  actions: {
    async setMenuList() {
      // 获取后端请求路由
      const userMenus = await MenuApi.currentUserMenu();
      // 与前端动态路由表过滤
      const menuList = matchRouter(userMenus.data);
      // 合并公共路由表
      const routerList = routes.concat(staticRouter.concat(menuList));
      routerList.forEach(route => {
        const routeName: any = route.name
        if (!router.hasRoute(routeName)) {
          // 动态添加到路由中
          router.addRoute(route)
        }
      })
      notFound.forEach((notFound) => router.addRoute(notFound))
      // 保存菜单列表
      this.matchList = routerList;
      // 保存缓存路由
      this.storageRouter = routerList;
    }
  },
  persist: {
    key: "MenuStore",
    storage: localStorage,
    paths: ['storageRouter']
  }
})
