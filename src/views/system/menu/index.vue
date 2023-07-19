<template>
  <view>
    <base-table :btn-auth="auth" :show-search="false" :row-keys="rowKeys" :columns="columns" :table-data="data" @row-select-callback="rowSelectCallback" @create-callback="createCallback" @remove-callback="removeCallback" @row-edit-callback="rowEditCallback" @row-remove-callback="rowRemoveCallback">
    <template #type="{record}">
      <a-tag :color="menuTypeOptions[record!.type].color">{{menuTypeOptions[record!.type].label}}</a-tag>
    </template>
    </base-table>
    <a-modal :visible="visible" width="800px" :title="isEdit ? '编辑' : '新增'" destroy-on-close @cancel="cancelCallback" @ok="okCallback">
      <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="rules">
        <a-form-item label="上级菜单" name="pid">
          <a-tree-select v-model:value="entity.pid" placeholder="请选择上级菜单" tree-default-expand-all :tree-data="data"></a-tree-select>
        </a-form-item>
        <a-form-item label="菜单名称" name="name">
          <a-input v-model:value="entity.name" placeholder="请输入菜单名称"></a-input>
        </a-form-item>
        <a-form-item label="类型" name="type">
          <a-radio-group v-model:value="entity.type" option-type="button" button-style="solid" :options="menuTypeOptions"></a-radio-group>
        </a-form-item>
        <a-form-item v-if="entity.type != 0" label="权限标识" name="permission">
          <a-input v-model:value="entity.permission" style="width: 100%" placeholder="请输入权限标识"></a-input>
        </a-form-item>
        <a-form-item v-if="entity.type != 2" label="访问地址" name="path">
          <a-input addon-before="/" v-model:value="entity.path" :min="0" style="width: 100%" placeholder="请输入访问地址"></a-input>
        </a-form-item>
        <a-form-item v-if="entity.type == 1" label="组件地址" name="componentPath">
          <a-input addon-before="src/views/" addon-after=".vue" v-model:value="entity.componentPath" style="width: 100%" placeholder="请输入组件地址"></a-input>
        </a-form-item>
        <a-form-item v-if="entity.type != 2" label="图标" name="icon">
          <a-input v-model:value="entity.icon" style="width: 100%" placeholder="请选择图标"></a-input>
        </a-form-item>
        <a-form-item v-if="entity.type != 2" label="排序" name="sort">
          <a-input-number v-model:value="entity.sort" :min="0" style="width: 100%" placeholder="请输入序号"></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { auth, columns, menuTypeOptions, rules } from "@/views/system/menu/index";
import menuApi from "@/api/system/menu/menu-api";
import { MenuEntity } from "@/api/interface/system/menu";

let currentInstance = getCurrentInstance();

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
let entity = reactive<MenuEntity>(new MenuEntity());
/**
 * 模态窗-确定回调
 */
const okCallback = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      menuApi.update(entity).then((res) => {
        callbackAfter('修改成功')
      })
    } else {
      menuApi.create(entity).then((res) => {
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
  entity = reactive<MenuEntity>(new MenuEntity());
  rowKeys = ref(<any>[])
}
/**
 * 多选删除回调
 */
const removeCallback = () => {
  menuApi.remove(rowKeys.value).then((res) => {
    callbackAfter('删除成功')
  })
}
/**
 * 行编辑回调
 * @param row
 */
const rowEditCallback = (row: MenuEntity) => {
  entity = reactive<MenuEntity>(JSON.parse(JSON.stringify(row)));
  isEdit.value = true
  visible.value = true
}
/**
 * 行删除回调
 * @param row
 */
const rowRemoveCallback = (row: MenuEntity) => {
  menuApi.remove([row.id]).then((res) => {
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
