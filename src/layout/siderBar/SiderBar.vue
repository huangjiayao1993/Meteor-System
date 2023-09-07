<template>
  <a-layout-sider v-model:collapsed="globalStore.isCollapsed" :trigger="null" collapsible>
    <div class="logo">
      <img src="@/assets/logo.png"/>
      <span v-if="!globalStore.isCollapsed">Meteor</span>
    </div>
    <a-menu :selected-kedys="selectedKedys" theme="dark" mode="inline" :open-keys="openKeys" @open-change="openChangeCallback">
      <template v-for="item in menuList">
        <template v-if="item.children?.length === 1 && item.redirect">
          <a-menu-item :key="item.path">
            <template #icon>
              <component :is="item.icon"/>
            </template>
            <router-link :to="{ path: item.path }">
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path"/>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import {onMounted, computed, ref} from "vue";
import {GlobalStore} from "@/store/index";
import {MenuStore} from "@/store/modules/menu";
import {MenuOptions} from "@/store/interface/index";
import SubMenu from "./components/SubMenu.vue";

const globalStore = GlobalStore();
const menuStore = MenuStore();
const selectedKedys = defineProps(["selectedKeys"]);

onMounted(() => {
  menuStore.setMenuList();
});
const menuList = computed((): MenuOptions[] =>
  menuStore.matchList.filter((path: any) => path["name"] !== "login")
);
let openKeys = ref(<any>[])
const openChangeCallback = (k: string[]) => {
  openKeys = k.slice(-1);
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  font-size: 30px;
  color: #fff;

  img {
    width: 45px;
    padding: 5px;
  }
}
</style>
