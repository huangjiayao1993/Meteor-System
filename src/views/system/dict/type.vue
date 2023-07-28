<template>
  <view>
    <base-table ref="tableRef" show-cache-btn :btn-auth="auth" :search-model="model" :columns="dictTypeColumns" :table-data="data" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="typeEditRef.show()" @remove-callback="removeCallback" @row-edit-callback="(row) => typeEditRef.show(row)" @row-remove-callback="(row) => removeCallback(row)" @refresh-cache-callback="refreshCacheCallback" @clean-cache-callback="cleanCacheCallback">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.name" placeholder="请输入字典名称"></a-input>
        </a-form-item>
      </template>
      <template #action="{record}">
        <a-button v-auth="auth.dictData" type="link" @click="dictDataRef.show(record.type)">数据</a-button>
      </template>
    </base-table>
    <type-edit ref="typeEditRef" @callback="searchCallback"></type-edit>
    <dict-data ref="dictDataRef"></dict-data>
  </view>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {auth, dictTypeColumns} from "@/views/system/dict/index";
import {DictTypeEntity, DictTypePageModel} from "@/api/interface/system/dict";
import dictApi from "@/api/system/dict/dict-api";
import {message} from "ant-design-vue";
import TypeEdit from '@/views/system/dict/type-edit.vue'
import DictData from '@/views/system/dict/data.vue'

let currentInstance = getCurrentInstance();

/**
 * 字典数据-实例
 */
const typeEditRef = ref();

/**
 * 字典数据-实例
 */
const dictDataRef = ref();

/**
 * 分页
 */
let model = reactive(new DictTypePageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  dictApi.typePage(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
searchCallback();
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive(new DictTypePageModel());
  searchCallback();
}
/**
 * 多选删除回调
 */
const removeCallback = (row: DictTypeEntity) => {
  const ids = row ? [row.id] : currentInstance!.ctx!.$refs.tableRef.keys
  dictApi.typeRemove(ids).then((res) => {
    message.success('删除成功')
    currentInstance!.ctx!.$refs.tableRef.cleanKeys()
    searchCallback();
  })
}
/**
 * 刷新缓存回调
 */
const refreshCacheCallback = () => {
  dictApi.refresh().then((res) => {
    message.success('刷新成功')
  })
}
/**
 * 清空缓存回调
 */
const cleanCacheCallback = () => {
  dictApi.clean().then((res) => {
    message.success('清空成功')
  })
}
</script>

<style scoped>
</style>
