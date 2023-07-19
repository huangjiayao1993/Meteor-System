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

const app = createApp(App);

app.component('base-table', BaseTable).use(pinia).use(router).use(Antd).use(Auth).mount('#app');
