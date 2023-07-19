<template>
  <view>
    <base-table :btn-auth="auth" show-tree :tree-data="tree" :row-keys="rowKeys" :search-model="model" :columns="columns" :table-data="data" @row-select-callback="rowSelectCallback" @tree-select-callback="treeSelectCallback" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="createCallback" @remove-callback="removeCallback" @row-edit-callback="rowEditCallback" @row-remove-callback="rowRemoveCallback">
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
        <a-button v-auth="auth.authorize" type="link" @click="authorize(record)">角色</a-button>
        <a-button v-auth="auth.updatePassword" type="link" @click="updatePasswordCallback(record)">修改密码</a-button>
      </template>
    </base-table>
    <a-modal :visible="visible" width="800px" :title="isEdit ? '编辑' : '新增'" destroy-on-close @cancel="cancelCallback" @ok="okCallback">
      <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="rules">
        <a-form-item label="组织" name="orgId">
          <a-tree-select v-model:value="entity.orgId" placeholder="请选择组织" tree-default-expand-all :tree-data="tree"></a-tree-select>
        </a-form-item>
        <a-form-item v-if="!isEdit" label="用户名" name="username">
          <a-input v-model:value="entity.username" placeholder="请输入用户名"></a-input>
        </a-form-item>
        <a-form-item v-if="!isEdit" label="密码" name="password">
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
    <a-modal :visible="authVisible" width="800px" title="角色" destroy-on-close @cancel="cancelAuthCallback" @ok="okAuthCallback">
      <a-tree checkable :field-names="{key: 'id', title: 'name'}" v-if="role!.length" :tree-data="role" default-expand-all :checked-keys="checkRoleKeys" @check="checkCallback"></a-tree>
    </a-modal>
    <a-modal :visible="updatePasswordVisible" width="800px" title="修改密码" destroy-on-close @cancel="cancelUpdatePasswordCallback" @ok="okUpdatePasswordCallback">
      <a-form ref="updatePasswordForm" :label-col="{span: 3}" :model="updatePasswordEntity" :rules="updatePasswordRules">
        <a-form-item label="原密码" name="password">
          <a-input-password v-model:value="updatePasswordEntity.password" placeholder="请输入原密码"></a-input-password>
        </a-form-item>
        <a-form-item label="新密码" name="newPassword">
          <a-input-password v-model:value="updatePasswordEntity.newPassword" placeholder="请输入新密码"></a-input-password>
        </a-form-item>
      </a-form>
    </a-modal>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { getCurrentInstance, reactive, ref } from "vue";
import { auth, columns, genderOptions, rules, updatePasswordRules } from "@/views/system/user/index";
import { OrgEntity } from "@/api/interface/system/org";
import { UserEntity, UserPageModel } from "@/api/interface/system/user";
import orgApi from "@/api/system/org/org-api";
import userApi from "@/api/system/user/user-api";
import roleApi from "@/api/system/role/role-api";
import { Modal, message } from "ant-design-vue";
import { AuthorizeEntity } from "@/api/interface/system/role";

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
let model = reactive<UserPageModel>(new UserPageModel());
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
  model = reactive<UserPageModel>(new UserPageModel());
  rowKeys = ref(<any>[])
  searchCallback();
}
/**
 * 新增按钮回调
 */
const createCallback = () => {
  isEdit.value = false
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
let entity = reactive<UserEntity>(new UserEntity());
/**
 * 模态窗-确定回调
 */
const okCallback = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      userApi.update(entity).then((res) => {
        callbackAfter('修改成功')
      })
    } else {
      userApi.create(entity).then((res) => {
        callbackAfter('新增成功')
      })
    }
  });
}
/**
 * 模态窗-关闭回调
 */
const cancelCallback = () => {
  visible.value = false;
  entity = reactive<UserEntity>(new UserEntity());
  rowKeys = ref(<any>[])
}
/**
 * 多选删除回调
 */
const removeCallback = () => {
  userApi.remove(rowKeys.value).then((res) => {
    callbackAfter('删除成功')
  })
}
/**
 * 行编辑回调
 * @param row
 */
const rowEditCallback = (row: UserEntity) => {
  entity = reactive<UserEntity>(JSON.parse(JSON.stringify(row)));
  entity.enableStartTime = entity.enableStartTime ? dayjs(entity.enableStartTime, {utc: true}) : null
  entity.enableEndTime = entity.enableEndTime ? dayjs(entity.enableEndTime, {utc: true}) : null
  isEdit.value = true
  visible.value = true;
}
/**
 * 行删除回调
 * @param row
 */
const rowRemoveCallback = (row: UserEntity) => {
  userApi.remove([row.id]).then((res) => {
    callbackAfter('删除成功')
  })
}
/**
 * 回调后事件
 * @param msg
 */
const callbackAfter = (msg: string) => {
  message.success(msg)
  cancelCallback();
  treeInit();
  searchCallback();
}
/**
 * 多选ID
 */
let rowKeys = ref(<any>[])
/**
 * 多选回调
 */
const rowSelectCallback = (selectedRowKeys: any, rows: any) => {
  rowKeys.value = selectedRowKeys
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
 * 角色树形
 */
let role = ref(<any>[])
/**
 * 选中角色ID
 */
let checkRoleKeys = ref(<any>[])
/**
 * 授权-模态窗
 */
let authVisible = ref(<boolean>false)
/**
 * 权限授权
 * @param row
 */
const authorize = (row: UserEntity) => {
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
  authVisible.value = true;
}
/**
 * 授权-取消回调
 */
const cancelAuthCallback = () => {
  authVisible.value = false;
  checkRoleKeys = ref(<any>[])
  entity = reactive<UserEntity>(new UserEntity());
}
/**
 * 授权-确定回调
 */
const okAuthCallback = () => {
  const data = reactive<AuthorizeEntity>({
    id: entity.id,
    authIds: checkRoleKeys.value
  })
  userApi.authorize(data).then((res) => {
    message.success("授权成功")
    cancelAuthCallback()
  })
}
/**
 * 授权多选框回调
 */
const checkCallback = (checkedKeys: any, e: any) => {
  checkRoleKeys.value = checkedKeys
}
/**
 * 重置密码回调
 */
const resetPasswordCallback = () => {
  if (rowKeys.value && rowKeys.value.length) {
    Modal.confirm({
      title: '警告',
      content: '请确实是否将所选数据进行重置密码!',
      maskClosable: true,
      onOk() {
        userApi.resetPassword(rowKeys.value).then((res) => {
          message.success("重置成功")
        })
      },
      onCancel() {},
    })
  } else {
    message.error("请选择要重置密码的数据")
  }
}
/**
 * 修改密码实体
 */
let updatePasswordEntity = reactive<UserEntity>(new UserEntity());
/**
 * 修改密码-模态窗
 */
let updatePasswordVisible = ref(<boolean>false)
/**
 * 修改密码回调
 * @param row
 */
const updatePasswordCallback = (row: UserEntity) => {
  updatePasswordEntity.id = row.id
  updatePasswordVisible.value = true;
}
/**
 * 修改密码-取消回调
 */
const cancelUpdatePasswordCallback = () => {
  updatePasswordVisible.value = false;
  updatePasswordEntity = reactive<UserEntity>(new UserEntity());
}
/**
 * 修改密码-确定回调
 */
const okUpdatePasswordCallback = () => {
  currentInstance!.ctx!.$refs.updatePasswordForm.validate().then(() => {
    if (updatePasswordEntity.id) {
      userApi.changePassword(updatePasswordEntity).then((res) => {
        message.success("修改成功")
        cancelUpdatePasswordCallback()
      })
    }
  });
}
</script>

<style scoped>
</style>
