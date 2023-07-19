<template>
  <div class="login">
    <div class="login-left">
      <div class="login-left-info">
        <span>Meteor System</span>
        <span>
          是一款开箱即用的开源后台管理系统解决方案，基于 Vue3 和 Ant Design Vue 实现，使用了最新的前端技术栈。
        </span>
      </div>
    </div>
    <div class="login-right">
      <a-form :model="usernameForm" class="login-form">
        <h4>Meteor System</h4>
        <a-form-item name="username" :rules="rules.username">
          <a-input v-model:value="usernameForm.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="rules.password">
          <a-input-password v-model:value="usernameForm.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox>记住我</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">忘记密码</a>
        </a-form-item>

        <a-form-item>
          <a-button :loading="loading" :disabled="disabled" type="primary" block @click="login()">
            登录
          </a-button>
        </a-form-item>

      </a-form>
      <p class="info">© Meteor System Beta</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { message } from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import loginApi from "@/api/login/login-api";
import { UsernameLoginForm } from "@/api/interface/login/login";
import { GlobalStore } from "@/store/index";
import { UserStore } from "@/store/modules/user";
import router from "@/routers";
import authApi from "@/api/auth/auth-api";

const globalStore = GlobalStore()
const userStore = UserStore()

/**
 * 登录规则
 */
const rules = reactive({
  username: [{required: true, message: "请输入用户名！"}],
  password: [{required: true, message: "请输入密码！"}],
});

/**
 * 用户名等表单
 */
const usernameForm = reactive<UsernameLoginForm>({
  username: "admin",
  password: "12345678",
  loginType: 'password'
});

/**
 * 登录按钮状态
 */
let loading = ref<Boolean>(false)

/**
 * 登录按钮状态
 */
const disabled = computed(() => {
  return !(usernameForm.username && usernameForm.password);
});

/**
 * 登录
 */
const login = () => {
  loading.value = true
  loginApi.login(usernameForm).then((tokenRes) => {
    globalStore.setTokenInfo(tokenRes.data);
    authApi.current().then((userRes) => {
      const roleList = userRes.data.roleList;
      const permissionList = userRes.data.permissionList;
      if (!roleList.length && !permissionList.length) {
        message.error("无权限登录")
      } else {
        userStore.setUser(userRes.data.user);
        userStore.setPermissions(permissionList);
        userStore.setRoles(roleList);
        message.success("登录成功");
        router.push({name: "home"});
      }
    }).catch((error) => {
      message.error("获取用户信息失败")
    })
  }).finally(() => {
    loading.value = false;
  });
};
</script>

<style scoped lang="scss">
@import "@/views/login/index.scss";
</style>
