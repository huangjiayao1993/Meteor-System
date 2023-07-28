<template>
  <a-modal :visible="visible" width="800px" :title="entity ? '编辑' : '新增'" destroy-on-close @cancel="close()" @ok="ok">
    <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="dictTypeRules">
      <a-form-item label="字典名称" name="name">
        <a-input v-model:value="entity.name" placeholder="请输入字典名称"></a-input>
      </a-form-item>
      <a-form-item label="字典类型" name="type">
        <a-input v-model:value="entity.type" placeholder="请输入字典类型"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {dictTypeRules} from "@/views/system/dict/index";
import {DictTypeEntity} from "@/api/interface/system/dict";
import dictApi from "@/api/system/dict/dict-api";
import {message} from "ant-design-vue";

const emits = defineEmits(['callback'])

let currentInstance = getCurrentInstance();

/**
 * 模态窗
 */
let visible = ref(<boolean>false)
/**
 * 模态窗-控制
 */
const show = (row: DictTypeEntity) => {
  if (row) {
    entity = reactive(<DictTypeEntity>JSON.parse(JSON.stringify(row)));
  }
  visible.value = true;
}
/**
 * 实体
 */
let entity = reactive(new DictTypeEntity());
/**
 * 模态窗-确定回调
 */
const ok = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      dictApi.typeUpdate(entity).then((res) => {
        close('修改成功')
      })
    } else {
      dictApi.typeCreate(entity).then((res) => {
        close('新增成功')
      })
    }
  });
}
/**
 * 模态窗-关闭回调
 */
const close = (msg: string = undefined) => {
  visible.value = false;
  entity = reactive(new DictTypeEntity());
  if (msg) {
    message.success(msg)
    emits('callback')
  }
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
