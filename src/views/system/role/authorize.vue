<template>
  <a-modal :visible="visible" width="800px" title="授权" destroy-on-close @cancel="close()" @ok="ok">
    <a-tree check-strictly checkable v-if="menu!.length" :tree-data="menu" default-expand-all :checked-keys="checkMenuKeys" @check="checkCallback"></a-tree>
  </a-modal>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import roleApi from "@/api/system/role/role-api";
import menuApi from "@/api/system/menu/menu-api";
import {AuthorizeEntity, RoleEntity} from "@/api/interface/system/role";

let currentInstance = getCurrentInstance();

/**
 * 模态窗
 */
let visible = ref(<boolean>false)
/**
 * 实体
 */
let entity = reactive(new RoleEntity());
/**
 * 菜单树形
 */
let menu = ref(<any>[])
/**
 * 选中菜单ID
 */
let checkMenuKeys = ref(<any>[])
/**
 * 权限授权
 * @param row
 */
const show = (row: RoleEntity) => {
  menuApi.tree().then((res) => {
    menu.value = res.data;
  })
  menuApi.listByRoleId(<string>row.id).then((res) => {
    let ids = []
    for (let item of res.data) {
      ids.push(item.id)
    }
    checkMenuKeys.value = ids
  })
  entity = row;
  visible.value = true;
}
/**
 * 授权-取消回调
 */
const close = (msg: string = undefined) => {
  visible.value = false;
  checkMenuKeys = ref(<any>[])
  entity = reactive(new RoleEntity());
  if (msg) {
    message.success("授权成功")
  }
}
/**
 * 授权-确定回调
 */
const ok = () => {
  const data = reactive(<AuthorizeEntity>{
    id: entity.id,
    authIds: checkMenuKeys.value
  })
  roleApi.authorize(data).then((res) => {
    close('授权成功')
  })
}
/**
 * 授权菜单多选框回调
 */
const checkCallback = (checkedKeys: any, e: any) => {
  checkMenuKeys.value = checkedKeys.checked
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
