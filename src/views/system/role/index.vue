<template>
  <view>
    <base-table ref="tableRef" :btn-auth="auth" :search-model="model" :columns="columns" :table-data="data" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="editRef.show()" @remove-callback="removeCallback" @row-edit-callback="(row) => editRef.show(row)" @row-remove-callback="(row) => removeCallback(row)">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.name" placeholder="请输入角色名称"></a-input>
        </a-form-item>
      </template>
      <template #action="{record}">
        <a-button v-auth="auth.authorize" type="link" @click="authorizeRef.show(record)">授权</a-button>
      </template>
    </base-table>
    <edit ref="editRef" @callback="searchCallback"></edit>
    <authorize ref="authorizeRef"></authorize>
  </view>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {auth, columns} from "@/views/system/role/index";
import roleApi from "@/api/system/role-api";
import {RoleEntity, RolePageModel} from "@/api/interface/system/role";
import Edit from "@/views/system/role/edit.vue"
import Authorize from "@/views/system/role/authorize.vue"

let currentInstance = getCurrentInstance();

/**
 * 编辑
 */
const editRef = ref()

/**
 * 授权
 */
const authorizeRef = ref()

/**
 * 分页
 */
let model = reactive(new RolePageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  roleApi.page(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
searchCallback();
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive(new RolePageModel());
  searchCallback();
}
/**
 * 删除回调
 */
const removeCallback = (row: RoleEntity) => {
  const ids = row ? [row.id] : currentInstance!.ctx!.$refs.tableRef.keys
  roleApi.remove(ids).then((res) => {
    message.success('删除成功')
    currentInstance!.ctx!.$refs.tableRef.cleanKeys()
    searchCallback();
  })
}
</script>

<style scoped>
</style>
