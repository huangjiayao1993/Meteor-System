<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { DarkMode } from "@/utils/theme";
import { getLocalStorageParse } from "@/utils/storage";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';

onBeforeMount(() => {
  let val = getLocalStorageParse("GlobalStore")?.isDark;
  if (val) DarkMode(val);
});

const locale = ref(zhCN);
dayjs.locale('zh-cn');
dayjs.extend(utc)
</script>

<style scoped>
</style>

