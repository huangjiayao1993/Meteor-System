<template>
  <a-modal :visible="visible" width="800px" :title="entity ? '编辑' : '新增'" destroy-on-close @cancel="close()" @ok="ok">
    <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="rules">
      <a-form-item label="键" name="key">
        <a-input v-model:value="entity.key" placeholder="请输入KEY键"></a-input>
      </a-form-item>
      <a-form-item label="值" name="value">
        <a-input v-model:value="entity.value" placeholder="请输入VALUE值"></a-input>
      </a-form-item>
      <a-form-item label="说明" name="desc">
        <a-input v-model:value="entity.desc" placeholder="请输入说明"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {rules} from "@/views/system/config/index";
import {ConfigEntity} from "@/api/interface/system/config";
import configApi from "@/api/system/config-api";
import {message} from "ant-design-vue";

const emits = defineEmits(['callback'])

let currentInstance = getCurrentInstance();

/**
 * 新增按钮回调
 */
const show = (row: ConfigEntity) => {
  if (row) {
    entity = reactive(<ConfigEntity>JSON.parse(JSON.stringify(row)));
  }
  visible.value = true;
}
/**
 * 模态窗
 */
let visible = ref(<boolean>false)
/**
 * 实体
 */
let entity = reactive(new ConfigEntity());
/**
 * 模态窗-确定回调
 */
const ok = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      configApi.update(entity).then((res) => {
        close('修改成功')
      })
    } else {
      configApi.create(entity).then((res) => {
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
  entity = reactive(new ConfigEntity());
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
