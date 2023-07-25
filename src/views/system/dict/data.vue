<template>
  <view>
    <a-modal :visible="visible" width="800px" title="字典数据" destroy-on-close @cancel="cancelCallback" @ok="cancelCallback">
      <base-table :btn-auth="auth" :row-keys="rowKeys" :search-model="model" :columns="dictDataColumns" :table-data="data" @row-select-callback="rowSelectCallback" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="createCallback" @remove-callback="removeCallback" @row-edit-callback="rowEditCallback" @row-remove-callback="rowRemoveCallback">
        <template #search>
          <a-form-item>
            <a-input v-model:value="model.name" placeholder="请输入字典名称"></a-input>
          </a-form-item>
        </template>
      </base-table>
    </a-modal>
    <a-modal :visible="formVisible" width="800px" :title="isEdit ? '编辑' : '新增'" destroy-on-close @cancel="cancelDataCallback" @ok="okDataCallback">
      <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="dictDataRules">
        <a-form-item label="字典数据名称" name="name">
          <a-input v-model:value="entity.name" placeholder="请输入字典数据名称"></a-input>
        </a-form-item>
        <a-form-item label="字典数据值" name="value">
          <a-input v-model:value="entity.value" placeholder="请输入字典数据值"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { auth, dictDataColumns, dictDataRules } from "@/views/system/dict/index";
import { DictDataEntity, DictDataPageModel } from "@/api/interface/system/dict";
import dictApi from "@/api/system/dict/dict-api";
import { message } from "ant-design-vue";
let currentInstance = getCurrentInstance();

/**
 * 分页
 */
let model = reactive<DictDataPageModel>(new DictDataPageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  dictApi.dataPage(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive<DictDataPageModel>(new DictDataPageModel());
  rowKeys = ref(<any>[])
  searchCallback();
}
/**
 * 模态窗
 */
let visible = ref(<boolean> false)
/**
 * 模态窗-控制
 */
const showModal = (type: string) => {
  visible.value = true
  model.type = type
  searchCallback();
}
/**
 * 新增按钮回调
 */
const createCallback = () => {
  isEdit.value = false
  formVisible.value = true
  entity.type = model.type
}
/**
 * 模态窗-是否编辑模式
 */
let isEdit = ref(<boolean>false)
/**
 * 实体
 */
let entity = reactive<DictDataEntity>(new DictDataEntity());
/**
 * 模态窗-关闭回调
 */
const cancelCallback = () => {
  visible.value = false;
  entity = reactive<DictDataEntity>(new DictDataEntity());
  rowKeys = ref(<any>[])
  data.value = []
}
/**
 * 多选删除回调
 */
const removeCallback = () => {
  dictApi.dataRemove(rowKeys.value).then((res) => {
    message.success('删除成功')
    searchCallback();
  })
}
/**
 * 行编辑回调
 * @param row
 */
const rowEditCallback = (row: DictDataEntity) => {
  entity = reactive<DictDataEntity>(JSON.parse(JSON.stringify(row)));
  isEdit.value = true
  formVisible.value = true
}
/**
 * 行删除回调
 * @param row
 */
const rowRemoveCallback = (row: DictDataEntity) => {
  dictApi.dataRemove([row.id]).then((res) => {
    message.success('删除成功')
    searchCallback();
  })
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
 * 模态窗-表单
 */
let formVisible = ref(<boolean> false)
/**
 * 模态窗-确定回调
 */
const okDataCallback = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      dictApi.dataUpdate(entity).then((res) => {
        callbackDataAfter('修改成功')
      })
    } else {
      dictApi.dataCreate(entity).then((res) => {
        callbackDataAfter('新增成功')
      })
    }
  });
}
/**
 * 模态窗-关闭回调
 */
const cancelDataCallback = () => {
  formVisible.value = false;
  entity = reactive<DictDataEntity>(new DictDataEntity());
}
/**
 * 回调后事件
 * @param msg
 */
const callbackDataAfter = (msg: string) => {
  message.success(msg)
  cancelDataCallback();
  searchCallback();
}
/**
 * 暴露方法
 */
defineExpose({
  showModal
})
</script>

<style scoped>
</style>
