import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Layout from "@/layout/index.vue"

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: '/home',
    component: Layout,
    meta: {
      title: '首页',
    },
    icon: 'DashboardOutlined',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import("../views/home/index.vue"),
        meta: {
          title: '首页',
        },
        icon: 'DashboardOutlined',
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
    meta: {
      auth: false,
      title: "登录页",
      key: "login"
    }
  }
]

export const notFound = [
  {
    path: '/nofound',
    name: 'NoFound',
    component: () => import('../views/notfound.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/notfound.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: false
})

export default router
