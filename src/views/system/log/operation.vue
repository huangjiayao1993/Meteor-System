<template>
  <view>
    <base-table :btn-auth="operationAuth" :search-model="model" :columns="operationColumns" :table-data="data" @search-callback="searchCallback" @reset-callback="restCallback">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.username" placeholder="请输入账号"></a-input>
        </a-form-item>
      </template>
      <template #success="{record}">
        <a-tag v-if="record.success" color="#87d068">成功</a-tag>
        <a-tag v-else color="#f50">异常</a-tag>
      </template>
    </base-table>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { operationAuth, operationColumns } from "@/views/system/log/index";
import logApi from "@/api/system/log-api";
import { OperationPageModel } from "@/api/interface/system/log"

/**
 * 分页
 */
let model = reactive(new OperationPageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  logApi.operationPage(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive(new OperationPageModel());
  searchCallback();
}

onMounted(() => {
  searchCallback()
})
</script>

<style scoped>
</style>
