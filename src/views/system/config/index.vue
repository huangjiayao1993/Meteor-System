<template>
  <base-table ref="tableRef" show-cache-btn :btn-auth="auth" :search-model="model" :columns="columns" :table-data="data" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="editRef.show()" @remove-callback="removeCallback" @row-edit-callback="(row) => editRef.show(row)" @row-remove-callback="(row) => removeCallback(row)" @refresh-cache-callback="refreshCacheCallback" @clean-cache-callback="cleanCacheCallback">
    <template #search>
      <a-form-item>
        <a-input v-model:value="model.key" placeholder="请输入配置KEY键"></a-input>
      </a-form-item>
    </template>
  </base-table>
  <edit ref="editRef" @callback="searchCallback"></edit>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref, onMounted} from "vue";
import {auth, columns} from "@/views/system/config/index";
import {ConfigEntity, ConfigPageModel} from "@/api/interface/system/config";
import configApi from "@/api/system/config-api";
import {message} from "ant-design-vue";
import Edit from "@/views/system/config/edit.vue"

let currentInstance = getCurrentInstance();

/**
 * 编辑
 */
let editRef = ref()

/**
 * 分页
 */
let model = reactive(new ConfigPageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  configApi.page(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive(new ConfigPageModel());
  searchCallback();
}
/**
 * 多选删除回调
 */
const removeCallback = (row: ConfigEntity) => {
  const ids = row ? [row.id] : currentInstance!.ctx!.$refs.tableRef.keys
  configApi.remove(ids).then((res) => {
    message.success('删除成功')
    currentInstance!.ctx!.$refs.tableRef.cleanKeys()
    searchCallback();
  })
}
/**
 * 刷新缓存回调
 */
const refreshCacheCallback = () => {
  configApi.refresh().then((res) => {
    message.success('刷新成功')
  })
}
/**
 * 清空缓存回调
 */
const cleanCacheCallback = () => {
  configApi.clean().then((res) => {
    message.success('清空成功')
  })
}

onMounted(() => {
  searchCallback()
})
</script>

<style scoped>
</style>
