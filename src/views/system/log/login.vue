<template>
  <view>
    <base-table :btn-auth="loginAuth" :search-model="model" :columns="loginColumns" :table-data="data" @search-callback="searchCallback" @reset-callback="restCallback">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.username" placeholder="请输入账号"></a-input>
        </a-form-item>
      </template>
      <template #success="{record}">
        <a-tag v-if="record.success" color="#87d068">成功</a-tag>
        <a-tag v-else color="#f50">失败</a-tag>
      </template>
    </base-table>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { loginAuth, loginColumns } from "@/views/system/log/index";
import logApi from "@/api/system/log/log-api";
import { LoginPageModel } from "@/api/interface/system/log"

/**
 * 分页
 */
let model = reactive(new LoginPageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  logApi.loginPage(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
searchCallback();
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive(new LoginPageModel());
  searchCallback();
}
</script>

<style scoped>
</style>
