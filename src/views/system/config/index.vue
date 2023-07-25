<template>
  <view>
    <base-table show-cache-btn :btn-auth="auth" :row-keys="rowKeys" :search-model="model" :columns="columns" :table-data="data" @row-select-callback="rowSelectCallback" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="createCallback" @remove-callback="removeCallback" @row-edit-callback="rowEditCallback" @row-remove-callback="rowRemoveCallback" @refresh-cache-callback="refreshCacheCallback" @clean-cache-callback="cleanCacheCallback">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.key" placeholder="请输入配置KEY键"></a-input>
        </a-form-item>
      </template>
    </base-table>
    <a-modal :visible="visible" width="800px" :title="isEdit ? '编辑' : '新增'" destroy-on-close @cancel="cancelCallback" @ok="okCallback">
      <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="rules">
        <a-form-item label="键" name="key">
          <a-input v-model:value="entity.key" placeholder="请输入KEY键"></a-input>
        </a-form-item>
        <a-form-item label="值" name="value">
          <a-input v-model:value="entity.value" placeholder="请输入VALUE值"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { auth, columns, rules } from "@/views/system/config/index";
import { ConfigEntity, ConfigPageModel } from "@/api/interface/system/config";
import configApi from "@/api/system/config/config-api";
import { message } from "ant-design-vue";

let currentInstance = getCurrentInstance();

/**
 * 分页
 */
let model = reactive<ConfigPageModel>(new ConfigPageModel());
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
searchCallback();
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive<ConfigPageModel>(new ConfigPageModel());
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
let entity = reactive<ConfigEntity>(new ConfigEntity());
/**
 * 模态窗-确定回调
 */
const okCallback = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      configApi.update(entity).then((res) => {
        callbackAfter('修改成功')
      })
    } else {
      configApi.create(entity).then((res) => {
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
  entity = reactive<ConfigEntity>(new ConfigEntity());
  rowKeys = ref(<any>[])
}
/**
 * 多选删除回调
 */
const removeCallback = () => {
  configApi.remove(rowKeys.value).then((res) => {
    callbackAfter('删除成功')
  })
}
/**
 * 行编辑回调
 * @param row
 */
const rowEditCallback = (row: ConfigEntity) => {
  entity = reactive<ConfigEntity>(JSON.parse(JSON.stringify(row)));
  isEdit.value = true
  visible.value = true
}
/**
 * 行删除回调
 * @param row
 */
const rowRemoveCallback = (row: ConfigEntity) => {
  configApi.remove([row.id]).then((res) => {
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
</script>

<style scoped>
</style>
