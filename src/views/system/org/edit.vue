<template>
  <a-modal :visible="visible" width="800px" :title="entity ? '编辑' : '新增'" destroy-on-close @cancel="close()" @ok="ok">
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
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {orgTypeOptions, rules} from "@/views/system/org/index";
import {OrgEntity} from "@/api/interface/system/org";
import orgApi from "@/api/system/org-api";
import {message} from "ant-design-vue";

const emits = defineEmits(['callback'])

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
 * 新增按钮回调
 */
const show = (row: OrgEntity) => {
  if (row) {
    entity = reactive(<OrgEntity>JSON.parse(JSON.stringify(row)));
  }
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
let entity = reactive(new OrgEntity());
/**
 * 模态窗-确定回调
 */
const ok = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      orgApi.update(entity).then((res) => {
        close('修改成功')
      })
    } else {
      orgApi.create(entity).then((res) => {
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
  entity = reactive(new OrgEntity());
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
