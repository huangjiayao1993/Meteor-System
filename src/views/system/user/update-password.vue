<template>
  <a-modal :visible="visible" width="800px" title="修改密码" destroy-on-close @cancel="close()" @ok="ok">
    <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="updatePasswordRules">
      <a-form-item label="原密码" name="password">
        <a-input-password v-model:value="entity.password" placeholder="请输入原密码"></a-input-password>
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input-password v-model:value="entity.newPassword" placeholder="请输入新密码"></a-input-password>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {updatePasswordRules} from "@/views/system/user/index";
import {UserEntity} from "@/api/interface/system/user";
import userApi from "@/api/system/user-api";
import {message} from "ant-design-vue";

let currentInstance = getCurrentInstance()

/**
 * 实体
 */
let entity = reactive(new UserEntity())
/**
 * 修改密码-模态窗
 */
let visible = ref(<boolean>false)
/**
 * 模态窗-控制
 */
const show = (row: UserEntity) => {
  entity = row
  visible.value = true
}
/**
 * 修改密码-取消回调
 */
const close = (msg: string = undefined) => {
  visible.value = false
  entity = reactive(new UserEntity())
  if (msg) {
    message.success(msg)
  }
}
/**
 * 修改密码-确定回调
 */
const ok = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      userApi.changePassword(entity).then((res) => {
        close('修改成功')
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
