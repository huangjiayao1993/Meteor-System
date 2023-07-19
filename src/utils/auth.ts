import {getLocalStorage} from "@/utils/storage";

export default {
  install(Vue: any) {
    Vue.directive('auth', {
      mounted(el: any, binding: any, vNode: any) {
        if (binding.value) {
          const permissions = getLocalStorage("Permissions");
          let has = hasPermissions(permissions, binding.value);
          if (!has) {
            el.parentNode.removeChild(el);
          }
        }
      }
    });
    function hasPermissions(permissions: any, btnPermissions: any): boolean {
      if (permissions) {
        const cache = new Set(permissions.split(","));
        if (cache.has('*:*:*')) {
          return true;
        }
        const btn = new Set(btnPermissions);
        let includes = new Set([...cache].filter(x => btn.has(x)));
        if (includes.size) {
          return true;
        }
      }
      return false
    }
  }
}
