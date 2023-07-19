<template>
  <view>
    <base-table :btn-auth="auth" :row-keys="rowKeys" :search-model="model" :columns="columns" :table-data="data" @row-select-callback="rowSelectCallback" @search-callback="searchCallback" @reset-callback="restCallback" @create-callback="createCallback" @remove-callback="removeCallback" @row-edit-callback="rowEditCallback" @row-remove-callback="rowRemoveCallback">
      <template #search>
        <a-form-item>
          <a-input v-model:value="model.name" placeholder="请输入角色名称"></a-input>
        </a-form-item>
      </template>
      <template #action="{record}">
        <a-button v-auth="[]" type="link" @click="authorize(record)">授权</a-button>
      </template>
    </base-table>
    <a-modal :visible="visible" width="800px" :title="isEdit ? '编辑' : '新增'" destroy-on-close @cancel="cancelCallback" @ok="okCallback">
      <a-form ref="form" :label-col="{span: 3}" :model="entity" :rules="rules">
        <a-form-item label="角色名称" name="name">
          <a-input v-model:value="entity.name" placeholder="请输入角色名称"></a-input>
        </a-form-item>
        <a-form-item label="角色标识" name="code">
          <a-input v-model:value="entity.code" style="width: 100%" placeholder="请输入角色标识"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal :visible="authVisible" width="800px" title="授权" destroy-on-close @cancel="cancelAuthCallback" @ok="okAuthCallback">
      <a-tree check-strictly checkable v-if="menu!.length" :tree-data="menu" default-expand-all :checked-keys="checkMenuKeys" @check="checkCallback"></a-tree>
    </a-modal>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { auth, columns, rules } from "@/views/system/role/index";
import roleApi from "@/api/system/role/role-api";
import menuApi from "@/api/system/menu/menu-api";
import { AuthorizeEntity, RoleEntity, RolePageModel } from "@/api/interface/system/role";

let currentInstance = getCurrentInstance();

/**
 * 分页
 */
let model = reactive<RolePageModel>(new RolePageModel());
/**
 * 数据列表
 */
let data = ref(<any>[]);
/**
 * 搜索回调
 */
const searchCallback = () => {
  roleApi.page(model).then((res) => {
    data.value = res.data.record;
    model.total = res.data.total;
  })
}
searchCallback();
/**
 * 重置搜索回调
 */
const restCallback = () => {
  model = reactive<RolePageModel>(new RolePageModel());
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
let entity = reactive<RoleEntity>(new RoleEntity());
/**
 * 模态窗-确定回调
 */
const okCallback = () => {
  currentInstance!.ctx!.$refs.form.validate().then(() => {
    if (entity.id) {
      roleApi.update(entity).then((res) => {
        callbackAfter('修改成功')
      })
    } else {
      roleApi.create(entity).then((res) => {
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
  entity = reactive<RoleEntity>(new RoleEntity());
  rowKeys = ref(<any>[])
}
/**
 * 多选删除回调
 */
const removeCallback = () => {
  roleApi.remove(rowKeys.value).then((res) => {
    callbackAfter('删除成功')
  })
}
/**
 * 行编辑回调
 * @param row
 */
const rowEditCallback = (row: RoleEntity) => {
  entity = reactive<RoleEntity>(JSON.parse(JSON.stringify(row)));
  isEdit.value = true
  visible.value = true
}
/**
 * 行删除回调
 * @param row
 */
const rowRemoveCallback = (row: RoleEntity) => {
  roleApi.remove([row.id]).then((res) => {
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
 * 菜单树形
 */
let menu = ref(<any>[])
/**
 * 选中菜单ID
 */
let checkMenuKeys = ref(<any>[])
/**
 * 授权-模态窗
 */
let authVisible = ref(<boolean>false)
/**
 * 权限授权
 * @param row
 */
const authorize = (row: RoleEntity) => {
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
  authVisible.value = true;
}
/**
 * 授权-取消回调
 */
const cancelAuthCallback = () => {
  authVisible.value = false;
  checkMenuKeys = ref(<any>[])
  entity = reactive<RoleEntity>(new RoleEntity());
}
/**
 * 授权-确定回调
 */
const okAuthCallback = () => {
  const data = reactive<AuthorizeEntity>({
    id: entity.id,
    authIds: checkMenuKeys.value
  })
  roleApi.authorize(data).then((res) => {
    message.success("授权成功")
    cancelAuthCallback()
  })
}
/**
 * 授权菜单多选框回调
 */
const checkCallback = (checkedKeys: any, e: any) => {
  checkMenuKeys.value = checkedKeys.checked
}
</script>

<style scoped>
</style>
