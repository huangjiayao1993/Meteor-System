import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import './style.css';
// pinia store
import pinia from '@/store/index';
// vue Router
import router from '@/routers/index';
// 权限
import Auth from "@/utils/auth";
// 基类表格组件
import BaseTable from '@/components/table/index.vue';
// icon图标选择
import IconPicker from '@/components/icon/index.vue';

import * as antIcons from '@ant-design/icons-vue'

const app = createApp(App);

Object.keys(antIcons).forEach(key => {
  // @ts-ignore
  app.component(key, antIcons[key])
})
// 添加到全局
app.config.globalProperties.$antIcons = antIcons

app.component('base-table', BaseTable).component('icon-picker', IconPicker).use(pinia).use(router).use(Antd).use(Auth).mount('#app');
