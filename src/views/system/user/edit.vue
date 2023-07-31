<template>
  <a-modal :visible="visible" width="800px" :title="entity ? '编辑' : '新增'" destroy-on-close @cancel="close()" @ok="ok">
    <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="rules">
      <a-form-item label="组织" name="orgId">
        <a-tree-select v-model:value="entity.orgId" placeholder="请选择组织" tree-default-expand-all :tree-data="tree"></a-tree-select>
      </a-form-item>
      <a-form-item v-if="!entity.id" label="用户名" name="username">
        <a-input v-model:value="entity.username" placeholder="请输入用户名"></a-input>
      </a-form-item>
      <a-form-item v-if="!entity.id" label="密码" name="password">
        <a-input-password v-model:value="entity.password" placeholder="请输入密码"></a-input-password>
      </a-form-item>
      <a-form-item label="用户昵称" name="nickname">
        <a-input v-model:value="entity.nickname" placeholder="请输入用户昵称"></a-input>
      </a-form-item>
      <a-form-item label="真实姓名" name="realname">
        <a-input v-model:value="entity.realname" placeholder="请输入真实姓名"></a-input>
      </a-form-item>
      <a-form-item label="手机号" name="mobile">
        <a-input v-model:value="entity.mobile" placeholder="请输入手机号"></a-input>
      </a-form-item>
      <!-- <a-form-item label="头像" name="avatar">
        <a-input v-model:value="entity.avatar" placeholder="请输入头像"></a-input>
      </a-form-item> -->
      <a-form-item label="性别" name="gender">
        <a-radio-group v-model:value="entity.gender" option-type="button" button-style="solid" :options="genderOptions"></a-radio-group>
      </a-form-item>
      <a-form-item label="使用期限" name="enableUsed">
        <a-switch v-model:checked="entity.enableUsed" />
      </a-form-item>
      <a-form-item v-if="entity.enableUsed" label="期限起始时间" name="enableStartTime">
        <a-date-picker v-model:value="entity.enableStartTime" format="YYYY-MM-DD HH:mm:ss" show-time :disabled-date="(current: any) => entity.enableEndTime && entity.enableEndTime.diff(current, 'days') < 1" style="width: 100%" />
      </a-form-item>
      <a-form-item v-if="entity.enableUsed" label="期限结束时间" name="enableEndTime">
        <a-date-picker v-model:value="entity.enableEndTime" format="YYYY-MM-DD HH:mm:ss" show-time :disabled-date="(current: any) => entity.enableStartTime && entity.enableStartTime.diff(current, 'days') > -1" style="width: 100%" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { genderOptions, rules } from "@/views/system/user/index";
import { OrgEntity } from "@/api/interface/system/org";
import { UserEntity } from "@/api/interface/system/user";
import orgApi from "@/api/system/org-api";
import userApi from "@/api/system/user-api";
import { message } from "ant-design-vue";
import dayjs from "dayjs";

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
 * 模态窗
 */
let visible = ref(<boolean>false)
/**
 * 模态窗-控制
 */
const show = (row: UserEntity) => {
  if (row) {
    entity = reactive(<UserEntity>JSON.parse(JSON.stringify(row)));
    entity.enableStartTime = entity.enableStartTime ? dayjs(entity.enableStartTime, {utc: true}) : null
    entity.enableEndTime = entity.enableEndTime ? dayjs(entity.enableEndTime, {utc: true}) : null
  }
  visible.value = true
}
/**
 * 实体
 */
let entity = reactive(new UserEntity());
/**
 * 模态窗-确定回调
 */
const ok = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      userApi.update(entity).then((res) => {
        close('修改成功')
      })
    } else {
      userApi.create(entity).then((res) => {
        close('新增成功')
      })
    }
  });
}
/**
 * 模态窗-关闭回调
 */
const close = (msg: string = undefined) => {
  visible.value = false
  entity = reactive(new UserEntity())
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
