const modules = import.meta.glob('/src/views/**/**.vue')

// 后端获取菜单路由与前端路由匹配
const matchRouter = function (syncRouter: any[] = []) {
  const list: any[] = [];
  syncRouter.forEach(item => {
    if (item.name) {
      item.meta = {
        title: item.name
      }
      if (item.path && !item.path.startsWith('/')) {
        item.path = `/${item.path}`
      }
      if (item["children"] && item.children.length > 0) {
        matchRouter(item.children)
      }
      if (item.type == 1) {
        item.component = modules[`/src/views/${item.componentPath}.vue`]
      } else {
        item.component = () => import(`@/layout/index.vue`)
      }
      list.push(item)
    }
  })
  return list;
}

export default matchRouter;
