<template>
  <a-modal :visible="visible" width="800px" :title="entity ? '编辑' : '新增'" destroy-on-close @cancel="close()" @ok="ok">
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
        <icon-picker v-model:icon="entity.icon">
          <template #iconSelect>
            <a-input v-model:value="entity.icon">
              <template #addonBefore>
                <component :is="$antIcons[entity.icon]" />
              </template>
            </a-input>
          </template>
        </icon-picker>
      </a-form-item>
      <a-form-item v-if="entity.type != 2" label="排序" name="sort">
        <a-input-number v-model:value="entity.sort" :min="0" style="width: 100%" placeholder="请输入序号"></a-input-number>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {menuTypeOptions, rules} from "@/views/system/menu/index";
import menuApi from "@/api/system/menu-api";
import {MenuEntity} from "@/api/interface/system/menu";

const emits = defineEmits(['callback'])

let currentInstance = getCurrentInstance();

/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 新增按钮回调
 */
const show = (list: any, row: MenuEntity) => {
  if (row) {
    entity = reactive(<MenuEntity>JSON.parse(JSON.stringify(row)));
  }
  data.value = list
  visible.value = true;
}
/**
 * 模态窗
 */
let visible = ref(<boolean>false)
/**
 * 实体
 */
let entity = reactive(new MenuEntity());
/**
 * 模态窗-确定回调
 */
const ok = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      menuApi.update(entity).then((res) => {
        close('修改成功')
      })
    } else {
      menuApi.create(entity).then((res) => {
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
  entity = reactive(new MenuEntity());
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
