<template>
  <view>
    <base-table ref="tableRef" :btn-auth="auth" :show-search="false" :columns="columns" :table-data="data" @create-callback="editRef.show(data)" @remove-callback="removeCallback" @row-edit-callback="(row) => editRef.show(data, row)" @row-remove-callback="(row) => removeCallback(row)">
      <template #type="{record}">
        <a-tag :color="menuTypeOptions[record!.type].color">{{menuTypeOptions[record!.type].label}}</a-tag>
      </template>
    </base-table>
    <edit ref="editRef" @callback="searchCallback"></edit>
  </view>
</template>

<script setup lang="ts">
import {getCurrentInstance, ref} from "vue";
import {message} from "ant-design-vue";
import {auth, columns, menuTypeOptions} from "@/views/system/menu/index";
import menuApi from "@/api/system/menu/menu-api";
import {MenuEntity} from "@/api/interface/system/menu";
import Edit from "@/views/system/menu/edit.vue";

let currentInstance = getCurrentInstance();

/**
 * 编辑
 */
let editRef = ref()

/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  menuApi.tree().then((res) => {
    data.value = res.data;
  })
}
searchCallback();
/**
 * 删除回调
 */
const removeCallback = (row: MenuEntity) => {
  const ids = row ? [row.id] : currentInstance!.ctx!.$refs.tableRef.keys
  menuApi.remove(ids).then((res) => {
    message.success('删除成功')
    currentInstance!.ctx!.$refs.tableRef.cleanKeys()
    searchCallback();
  })
}
</script>

<style scoped>
</style>
