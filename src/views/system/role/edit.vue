<template>
  <a-modal :visible="visible" width="800px" :title="entity ? '编辑' : '新增'" destroy-on-close @cancel="close()" @ok="ok">
    <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="rules">
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="entity.name" placeholder="请输入角色名称"></a-input>
      </a-form-item>
      <a-form-item label="角色标识" name="code">
        <a-input v-model:value="entity.code" style="width: 100%" placeholder="请输入角色标识"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {rules} from "@/views/system/role/index";
import roleApi from "@/api/system/role/role-api";
import {RoleEntity} from "@/api/interface/system/role";

const emits = defineEmits(['callback'])

let currentInstance = getCurrentInstance();

/**
 * 模态窗
 */
let visible = ref(<boolean>false)
/**
 * 模态窗-控制
 */
const show = (row: RoleEntity) => {
  if (row) {
    entity = reactive(<RoleEntity>JSON.parse(JSON.stringify(row)));
  }
  visible.value = true
}
/**
 * 实体
 */
let entity = reactive(new RoleEntity());
/**
 * 模态窗-确定回调
 */
const ok = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      roleApi.update(entity).then((res) => {
        close('修改成功')
      })
    } else {
      roleApi.create(entity).then((res) => {
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
  entity = reactive(new RoleEntity());
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
