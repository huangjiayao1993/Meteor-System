<template>
  <a-modal :visible="visible" width="800px" :title="entity ? '编辑' : '新增'" destroy-on-close @cancel="close()" @ok="ok">
    <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="dictDataRules">
      <a-form-item label="字典数据名称" name="name">
        <a-input v-model:value="entity.name" placeholder="请输入字典数据名称"></a-input>
      </a-form-item>
      <a-form-item label="字典数据值" name="value">
        <a-input v-model:value="entity.value" placeholder="请输入字典数据值"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {dictDataRules} from "@/views/system/dict/index";
import {DictDataEntity} from "@/api/interface/system/dict";
import dictApi from "@/api/system/dict-api";
import {message} from "ant-design-vue";

const emits = defineEmits(['callback'])

let currentInstance = getCurrentInstance();

/**
 * 模态窗
 */
let visible = ref(<boolean> false)
/**
 * 模态窗-控制
 */
const show = (type: string, row: DictDataEntity) => {
  entity.type = type
  if (row) {
    entity = reactive(<DictDataEntity>JSON.parse(JSON.stringify(row)));
  }
  visible.value = true
}
/**
 * 实体
 */
let entity = reactive(new DictDataEntity());
/**
 * 模态窗-关闭回调
 */
const close = (msg: string = undefined) => {
  visible.value = false;
  entity = reactive(new DictDataEntity());
  if (msg) {
    message.success(msg)
    emits('callback')
  }
}
/**
 * 模态窗-确定回调
 */
const ok = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      dictApi.dataUpdate(entity).then((res) => {
        close('修改成功')
      })
    } else {
      dictApi.dataCreate(entity).then((res) => {
        close('新增成功')
      })
    }
  });
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
