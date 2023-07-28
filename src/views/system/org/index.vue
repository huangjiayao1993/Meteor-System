<template>
  <view>
    <base-table ref="tableRef" :btn-auth="auth" show-tree :tree-data="tree" :search-model="model" :columns="columns" :table-data="data" @tree-select-callback="treeSelectCallback" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="editRef.show()" @remove-callback="removeCallback" @row-edit-callback="(row) => editRef.show(row)" @row-remove-callback="(row) => removeCallback(row)">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.name" placeholder="请输入组织名称"></a-input>
        </a-form-item>
      </template>
    </base-table>
    <edit ref="editRef" @callback="searchCallback"></edit>
  </view>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {auth, columns} from "@/views/system/org/index";
import {OrgEntity, OrgPageModel} from "@/api/interface/system/org";
import orgApi from "@/api/system/org/org-api";
import {message} from "ant-design-vue";
import Edit from "@/views/system/org/edit.vue";

let currentInstance = getCurrentInstance();

/**
 * 编辑
 */
const editRef = ref()

/**
 * 树形
 */
let tree = ref(<any>[]);
/**
 * 树形回调
 */
const treeInit = () => {
  orgApi.tree(<OrgEntity>{}).then((res) => {
    tree.value = res.data;
  })
}
treeInit();
/**
 * 树点击回调
 */
const treeSelectCallback = (selectedKeys: any, e: any) => {
  model.id = null;
  if (selectedKeys.length) {
    model.id = selectedKeys[0];
  }
  model.current = 1;
  searchCallback();
}
/**
 * 分页
 */
let model = reactive(new OrgPageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  orgApi.page(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
searchCallback();
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive(new OrgPageModel());
  searchCallback();
}
/**
 * 删除回调
 */
const removeCallback = (row: OrgEntity) => {
  const ids = row ? [row.id] : currentInstance!.ctx!.$refs.tableRef.keys
  orgApi.remove(ids).then((res) => {
    message.success('删除成功')
    currentInstance!.ctx!.$refs.tableRef.cleanKeys()
    treeInit();
    searchCallback();
  })
}
</script>

<style scoped>
</style>
