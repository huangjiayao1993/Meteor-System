<template>
  <view>
    <base-table show-cache-btn :btn-auth="dictAuth" :row-keys="rowKeys" :search-model="model" :columns="dictTypeColumns" :table-data="data" @row-select-callback="rowSelectCallback" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="createCallback" @remove-callback="removeCallback" @row-edit-callback="rowEditCallback" @row-remove-callback="rowRemoveCallback">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.name" placeholder="请输入字典名称"></a-input>
        </a-form-item>
      </template>
    </base-table>
    <a-modal :visible="visible" width="800px" :title="isEdit ? '编辑' : '新增'" destroy-on-close @cancel="cancelCallback" @ok="okCallback">
      <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="dictTypeRules">
        <a-form-item label="字典名称" name="name">
          <a-input v-model:value="entity.name" placeholder="请输入字典名称"></a-input>
        </a-form-item>
        <a-form-item label="字典类型" name="type">
          <a-input v-model:value="entity.type" placeholder="请输入字典类型"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { dictAuth, dictTypeColumns, dictTypeRules } from "@/views/system/dict/index";
import { DictTypeEntity, DictTypePageModel } from "@/api/interface/system/dict";
import dictTypeApi from "@/api/system/dict/dict-api";
import { message } from "ant-design-vue";

let currentInstance = getCurrentInstance();

/**
 * 分页
 */
let model = reactive<DictTypePageModel>(new DictTypePageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  dictTypeApi.typePage(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
searchCallback();
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive<DictTypePageModel>(new DictTypePageModel());
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
let entity = reactive<DictTypeEntity>(new DictTypeEntity());
/**
 * 模态窗-确定回调
 */
const okCallback = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      dictTypeApi.typeUpdate(entity).then((res) => {
        callbackAfter('修改成功')
      })
    } else {
      dictTypeApi.typeCreate(entity).then((res) => {
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
  entity = reactive<DictTypeEntity>(new DictTypeEntity());
  rowKeys = ref(<any>[])
}
/**
 * 多选删除回调
 */
const removeCallback = () => {
  dictTypeApi.typeRemove(rowKeys.value).then((res) => {
    callbackAfter('删除成功')
  })
}
/**
 * 行编辑回调
 * @param row
 */
const rowEditCallback = (row: DictTypeEntity) => {
  entity = reactive<DictTypeEntity>(JSON.parse(JSON.stringify(row)));
  isEdit.value = true
  visible.value = true
}
/**
 * 行删除回调
 * @param row
 */
const rowRemoveCallback = (row: DictTypeEntity) => {
  dictTypeApi.typeRemove([row.id]).then((res) => {
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
