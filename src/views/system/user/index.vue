<template>
  <view>
    <base-table ref="tableRef" :btn-auth="auth" show-tree :tree-data="tree" :search-model="model" :columns="columns" :table-data="data" @tree-select-callback="treeSelectCallback" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="editRef.show()" @remove-callback="removeCallback" @row-edit-callback="(row) => editRef.show(row)" @row-remove-callback="(row) => removeCallback(row)">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.nickname" placeholder="请输入用户昵称"></a-input>
        </a-form-item>
      </template>
      <template #titleBtn>
        <a-button v-auth="auth.resetPassword" type="danger" @click="resetPasswordCallback">重置密码</a-button>
      </template>
      <template #avatar="{record}">
        <a-avatar size="large" :src="record.avatar"></a-avatar>
      </template>
      <template #status="{record}">
        <a-switch :loading="statusChangeLoading" v-model:checked="record.status" :checked-value="false" checked-children="正常" :un-checked-value="true" un-checked-children="停用" @change="(checked: boolean) => statusChangeCallback(checked, record)"/>
      </template>
      <template #action="{record}">
        <a-button v-auth="auth.authorize" type="link" @click="authorizeRef.show(record)">角色</a-button>
        <a-button v-auth="auth.updatePassword" type="link" @click="updatePasswordRef.show(record)">修改密码</a-button>
      </template>
    </base-table>
    <edit ref="editRef" @callback="searchCallback"></edit>
    <authorize ref="authorizeRef"></authorize>
    <update-password ref="updatePasswordRef"></update-password>
  </view>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {auth, columns} from "@/views/system/user/index";
import {OrgEntity} from "@/api/interface/system/org";
import {UserEntity, UserPageModel} from "@/api/interface/system/user";
import orgApi from "@/api/system/org/org-api";
import userApi from "@/api/system/user/user-api";
import {message, Modal} from "ant-design-vue";
import Edit from "@/views/system/user/edit.vue"
import Authorize from "@/views/system/user/authorize.vue"
import UpdatePassword from "@/views/system/user/update-password.vue"

let currentInstance = getCurrentInstance();

/**
 * 编辑
 */
const editRef = ref();

/**
 * 授权
 */
const authorizeRef = ref()

/**
 * 修改密码
 */
const updatePasswordRef = ref()

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
 * 树点击回调
 */
const treeSelectCallback = (selectedKeys: any, e: any) => {
  model.orgId = null;
  if (selectedKeys.length) {
    model.orgId = selectedKeys[0];
  }
  model.current = 1;
  searchCallback();
}
/**
 * 分页
 */
let model = reactive(new UserPageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  userApi.page(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
searchCallback();
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive(new UserPageModel());
  searchCallback();
}
/**
 * 删除回调
 */
const removeCallback = (row: UserEntity) => {
  const ids = row ? [row.id] : currentInstance!.ctx!.$refs.tableRef.keys
  userApi.remove(ids).then((res) => {
    message.success('删除成功')
    currentInstance!.ctx!.$refs.tableRef.cleanKeys()
    treeInit()
    searchCallback()
  })
}
/**
 * 状态修改loading
 */
let statusChangeLoading = ref(<boolean>false)
/**
 * 状态修改回调
 */
const statusChangeCallback = (checked: boolean, record: UserEntity) => {
  statusChangeLoading.value = true
  let data = reactive(<UserEntity>{
    id: record.id,
    status: checked,
    version: record.version
  })
  userApi.changeStatus(data).then((res) => {
    message.success("修改成功")
  }).finally(() => {
    statusChangeLoading.value = false
  })
}
/**
 * 重置密码回调
 */
const resetPasswordCallback = () => {
  let table = currentInstance!.ctx!.$refs.tableRef;
  if (table.keys && table.keys.length) {
    Modal.confirm({
      title: '警告',
      content: '请确实是否将所选数据进行重置密码!',
      maskClosable: true,
      onOk() {
        userApi.resetPassword(table.keys).then((res) => {
          message.success("重置成功")
          table.cleanKeys()
        })
      },
      onCancel() {},
    })
  } else {
    message.error("请选择要重置密码的数据")
  }
}
</script>

<style scoped>
</style>
