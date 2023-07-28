<template>
  <a-modal :visible="visible" width="800px" title="角色" destroy-on-close @cancel="close()" @ok="ok">
    <a-tree checkable :field-names="{key: 'id', title: 'name'}" v-if="role!.length" :tree-data="role" default-expand-all :checked-keys="checkRoleKeys" @check="checkCallback"></a-tree>
  </a-modal>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {UserEntity} from "@/api/interface/system/user";
import userApi from "@/api/system/user/user-api";
import roleApi from "@/api/system/role/role-api";
import {message} from "ant-design-vue";
import {AuthorizeEntity} from "@/api/interface/system/role";

let currentInstance = getCurrentInstance();

/**
 * 模态窗
 */
let visible = ref(<boolean>false)
/**
 * 模态窗-控制
 */
const show = (row: UserEntity) => {
  roleApi.list().then((res) => {
    role.value = res.data;
  })
  roleApi.listByUserId(<string>row.id).then((res) => {
    let ids = []
    for (let item of res.data) {
      ids.push(item.id)
    }
    checkRoleKeys.value = ids
  })
  entity = row;
  visible.value = true;
}
/**
 * 实体
 */
let entity = reactive(new UserEntity());
/**
 * 角色树形
 */
let role = ref(<any>[])
/**
 * 选中角色ID
 */
let checkRoleKeys = ref(<any>[])
/**
 * 模态窗-确定回调
 */
const ok = () => {
  const data = reactive(<AuthorizeEntity>{
    id: entity.id,
    authIds: checkRoleKeys.value
  })
  userApi.authorize(data).then((res) => {
    close("授权成功")
  })
}
/**
 * 模态窗-关闭回调
 */
const close = (msg: string = undefined) => {
  visible.value = false
  checkRoleKeys = ref(<any>[])
  entity = reactive(new UserEntity())
  if (msg) {
    message.success(msg)
  }
}
/**
 * 授权多选框回调
 */
const checkCallback = (checkedKeys: any, e: any) => {
  checkRoleKeys.value = checkedKeys
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
