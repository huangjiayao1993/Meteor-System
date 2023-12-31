import router from "@/routers/router";
import { GlobalStore } from "@/store/index";
import { MenuStore } from "@/store/modules/menu";
import { TabsStore } from "@/store/modules/tabs";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

/**
 * 路由拦截
 */
router.beforeEach((to, from, next) => {
	NProgress.start()
	// 判断当前路由是否需要访问权限
  const tabsStore = TabsStore();
	// 是否已经存在目标to的tab
	const hasTabs = tabsStore.tabsOption.findIndex((tab) => tab.key === to.path) > -1;
	if (!hasTabs && to.matched.length > 0) {
		const path = to.path === "/login" || to.name === "not-found";
    if (!path) {
			// @ts-ignore
      tabsStore.addTab(to.meta.title, to.path);
		}
	}
	const globalStore = GlobalStore();
	if (globalStore.tokenInfo.tokenValue) {
		if (to.name == "login") {
      // 存在token，跳转至首页
			next({path: '/home'});
		} else {
			if (to.matched.length > 0) {
				next();
			} else {
				const menuStore = MenuStore();
				menuStore.setMenuList().then(() => {
					next({ ...to, replace: true });
				});
			}
		}
	} else {
		if (to.path == "/login") {
			next();
		} else {
			next({
				path: "/login",
				query: {
					redirect: to.fullPath,
				},
			});
			NProgress.done()
		}
	}
});
router.afterEach(() => {
	NProgress.done()
})

export default router;
