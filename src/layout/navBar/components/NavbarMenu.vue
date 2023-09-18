<template>
  <div class="navbar-menu">
    <span class="navbar-menu-item" @click="toggle">
      <fullscreen-outlined v-show="!isFullscreen" />
      <fullscreen-exit-outlined v-show="isFullscreen" />
    </span>
    <a-dropdown class="navbar-menu-item">
      <div class="users-info" @click.prevent>
        <a-avatar :src="userStore.user.avatar"/>
        <span class="nickname">{{ userStore.user.nickname }}</span>
        <down-outlined />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a @click="logout">退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
import router from "@/routers";
import { DownOutlined, FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons-vue";
import { UserStore } from "@/store/modules/user";
import { useFullscreen } from '@vueuse/core'
import { cleanUserToken } from "@/utils/common";
import authApi from "@/api/auth/auth-api";
import watermark from '@/utils/watermark.js';
import {onMounted} from "vue";

const userStore = UserStore();
const { isFullscreen, toggle } = useFullscreen()

const initCurrentUser = () => {
  authApi.current().then((res) => {
    userStore.setUser(res.data.data);
    userStore.setPermissions(res.data.permissionList);
    userStore.setRoles(res.data.roleList);
  })
}

const logout = () => {
  authApi.logout().finally(() => {
    watermark.out()
    cleanUserToken()
    window.localStorage.removeItem("MenuStore")
    window.location.replace("/login")
  })
}

onMounted(() => {
  initCurrentUser();
})
</script>
<style scoped lang="scss">
.navbar-menu {
  float: right;

  .navbar-menu-item {
    height: 64px;
    display: inline-block;
    padding: 0 10px;

    &:hover {
      cursor: pointer;
      background: rgba(155, 153, 153, 0.1) !important;
    }
  }
}

.users-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: right;

  .nickname {
    padding: 0 5px;
  }
}
</style>
