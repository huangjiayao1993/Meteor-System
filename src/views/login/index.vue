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
        <h2>登&nbsp;&nbsp;录</h2>
        <a-form-item name="username" :rules="rules.username">
          <a-input v-model:value="usernameForm.username" placeholder="请输入用户名">
            <template #prefix>
              <UserOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="rules.password">
          <a-input-password v-model:value="usernameForm.password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="code" :rules="rules.code">
          <a-input-group compact>
            <a-input size="large" placeholder="请输入验证码" v-model:value="usernameForm.code" style="margin-right: 10px; width: calc(100% - 112px)">
              <template #prefix>
                <BellOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
            <view style="border: 1px solid #d5d5d5;">
              <a-image style="height: 38px;" :width="100" :preview="false" :src="image" @click="loadCaptcha" @error="errorCallback" :fallback="errorBase64"/>
            </view>
          </a-input-group>
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
import {reactive, computed, ref, onMounted} from "vue";
import { message } from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";
import { UsernameLoginForm } from "@/api/interface/login/login";
import { GlobalStore } from "@/store/index";
import { UserStore } from "@/store/modules/user";
import router from "@/routers";
import authApi from "@/api/auth/auth-api";
import {encrypt} from "@/utils/rsa";

const globalStore = GlobalStore()
const userStore = UserStore()

/**
 * 登录规则
 */
const rules = reactive(<any>{
  username: [{required: true, message: "请输入用户名"}],
  password: [{required: true, message: "请输入密码"}],
  code: [
    {required: true, message: "请输入验证码"},
    {min: 4, max: 4, message: "验证码为4位长度"},
  ],
});

/**
 * 异常验证码base64
 */
const errorBase64 = 'data:image/png;base64,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'
/**
 * 验证码图片
 */
let image = ref(<string>errorBase64)
/**
 * 获取验证码
 */
const loadCaptcha = () => {
  authApi.captcha().then((res) => {
    image.value = res.data.image
    usernameForm.uuid = res.data.uuid
  }).catch((error) => {
    errorCallback()
  })
}
/**
 * 验证码异常回调
 */
const errorCallback = () => {
  image.value = errorBase64
}

/**
 * 用户名等表单
 */
const usernameForm = reactive(<UsernameLoginForm>{
  loginType: 'password',
});

/**
 * 登录按钮状态
 */
let loading = ref(<boolean>false)

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
  const form = <UsernameLoginForm>JSON.parse(JSON.stringify(usernameForm))
  form.username = encrypt(usernameForm.username)
  form.password = encrypt(usernameForm.password)
  authApi.login(form).then((tokenRes) => {
    globalStore.setTokenInfo(tokenRes.data);
    authApi.current().then((userRes) => {
      const roleList = userRes.data.roleList;
      const permissionList = userRes.data.permissionList;
      if (!roleList.length && !permissionList.length) {
        message.error("无权限登录")
      } else {
        userStore.setUser(userRes.data.data);
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

onMounted(() => {
  loadCaptcha()
})
</script>

<style scoped lang="scss">
@import "@/views/login/index.scss";
</style>
