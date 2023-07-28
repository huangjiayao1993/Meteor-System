<template>
  <view>
    <a-modal :visible="visible" width="800px" title="字典数据" destroy-on-close @cancel="close" @ok="close">
      <base-table ref="tableRef" :btn-auth="auth" :search-model="model" :columns="dictDataColumns" :table-data="data" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="dataEditRef.show(model.type)" @remove-callback="removeCallback" @row-edit-callback="(row) => dataEditRef.show(model.type, row)" @row-remove-callback="(row) => removeCallback(row)">
        <template #search>
          <a-form-item>
            <a-input v-model:value="model.name" placeholder="请输入字典名称"></a-input>
          </a-form-item>
        </template>
      </base-table>
    </a-modal>
    <data-edit ref="dataEditRef" @callback="searchCallback"></data-edit>
  </view>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {auth, dictDataColumns} from "@/views/system/dict/index";
import {DictDataEntity, DictDataPageModel} from "@/api/interface/system/dict";
import dictApi from "@/api/system/dict/dict-api";
import {message} from "ant-design-vue";
import DataEdit from "@/views/system/dict/data-edit.vue";

let currentInstance = getCurrentInstance();

/**
 * 编辑
 */
let dataEditRef = ref()

/**
 * 分页
 */
let model = reactive(new DictDataPageModel());
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
  model = reactive(new DictDataPageModel());
  searchCallback();
}
/**
 * 模态窗
 */
let visible = ref(<boolean> false)
/**
 * 模态窗-控制
 */
const show = (type: string) => {
  visible.value = true
  model.type = type
  searchCallback();
}
/**
 * 多选删除回调
 */
const removeCallback = (row: DictDataEntity) => {
  const ids = row ? [row.id] : currentInstance!.ctx!.$refs.tableRef.keys
  dictApi.dataRemove(ids).then((res) => {
    message.success('删除成功')
    currentInstance!.ctx!.$refs.tableRef.cleanKeys()
    searchCallback();
  })
}
/**
 * 模态窗-关闭回调
 */
const close = () => {
  visible.value = false;
  data = ref(<any>[]);
}
/**
 * 暴露方法
 */
defineExpose({
  show
})
</script>

<style scoped>
</style>
