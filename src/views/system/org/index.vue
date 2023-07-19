<template>
  <view>
    <base-table :btn-auth="auth" show-tree :tree-data="tree" :row-keys="rowKeys" :search-model="model" :columns="columns" :table-data="data" @row-select-callback="rowSelectCallback" @tree-select-callback="treeSelectCallback" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="createCallback" @remove-callback="removeCallback" @row-edit-callback="rowEditCallback" @row-remove-callback="rowRemoveCallback">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.name" placeholder="请输入组织名称"></a-input>
        </a-form-item>
      </template>
    </base-table>
    <a-modal :visible="visible" width="800px" :title="isEdit ? '编辑' : '新增'" destroy-on-close @cancel="cancelCallback" @ok="okCallback">
      <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="rules">
        <a-form-item label="上级组织" name="pid">
          <a-tree-select v-model:value="entity.pid" placeholder="请选择上级组织" tree-default-expand-all :tree-data="tree"></a-tree-select>
        </a-form-item>
        <a-form-item label="组织名称" name="name">
          <a-input v-model:value="entity.name" placeholder="请输入组织名称"></a-input>
        </a-form-item>
        <a-form-item label="分类" name="type">
          <a-radio-group v-model:value="entity.type" option-type="button" button-style="solid" :options="orgTypeOptions"></a-radio-group>
        </a-form-item>
        <a-form-item label="排序" name="sort">
          <a-input-number v-model:value="entity.sort" :min="0" style="width: 100%" placeholder="请输入序号"></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { auth, columns, orgTypeOptions, rules } from "@/views/system/org/index";
import { OrgEntity, OrgPageModel } from "@/api/interface/system/org";
import orgApi from "@/api/system/org/org-api";
import { message } from "ant-design-vue";

let currentInstance = getCurrentInstance();

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
let model = reactive<OrgPageModel>(new OrgPageModel());
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
  model = reactive<OrgPageModel>(new OrgPageModel());
  rowKeys = ref(<any>[])
  searchCallback();
}
/**
 * 新增按钮回调
 */
const createCallback = () => {
  isEdit.value = false
  visible.value = true;
}
/**
 * 模态窗-是否编辑模式
 */
let isEdit = ref(<boolean>false)
/**
 * 模态窗
 */
let visible = ref(<boolean>false)
/**
 * 实体
 */
let entity = reactive<OrgEntity>(new OrgEntity());
/**
 * 模态窗-确定回调
 */
const okCallback = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      orgApi.update(entity).then((res) => {
        callbackAfter('修改成功')
      })
    } else {
      orgApi.create(entity).then((res) => {
        callbackAfter('新增成功')
      })
    }
  });
}
/**
 * 模态窗-关闭回调
 */
const cancelCallback = () => {
  visible.value = false;
  entity = reactive<OrgEntity>(new OrgEntity());
  rowKeys = ref(<any>[])
}
/**
 * 多选删除回调
 */
const removeCallback = () => {
  orgApi.remove(rowKeys.value).then((res) => {
    callbackAfter('删除成功')
  })
}
/**
 * 行编辑回调
 * @param row
 */
const rowEditCallback = (row: OrgEntity) => {
  entity = reactive<OrgEntity>(JSON.parse(JSON.stringify(row)));
  isEdit.value = true
  visible.value = true
}
/**
 * 行删除回调
 * @param row
 */
const rowRemoveCallback = (row: OrgEntity) => {
  orgApi.remove([row.id]).then((res) => {
    callbackAfter('删除成功')
  })
}
/**
 * 回调后事件
 * @param msg
 */
const callbackAfter = (msg: string) => {
  message.success(msg)
  cancelCallback();
  treeInit();
  searchCallback();
}
/**
 * 多选ID
 */
let rowKeys = ref(<any>[])
/**
 * 多选回调
 */
const rowSelectCallback = (selectedRowKeys: any, rows: any) => {
  rowKeys.value = selectedRowKeys
}
</script>

<style scoped>
</style>
