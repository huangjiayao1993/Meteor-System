<template>
  <view>
    <a-row :gutter="showTree ? [8,8] : [0,0]">
      <a-col v-if="showTree" :span="6">
        <a-tree v-if="treeData!.length" :tree-data="treeData" default-expand-all @select="treeSelectCallback"></a-tree>
      </a-col>
      <a-col :span="showTree ? 18 : 24">
        <a-row v-if="showSearch" class="searchRow">
          <a-form ref="searchForm" layout="inline">
            <slot name="search"></slot>
            <a-form-item>
              <a-space>
                <a-button type="primary" v-auth="btnAuth.search" @click="searchCallback">
                  查询
                </a-button>
                <a-button type="primary" @click="resetCallback">
                  重置
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-row>
        <a-row>
          <a-card class="tableCard" :bordered="false" :head-style="{padding: '0px'}" :body-style="{padding: '0px'}">
            <template #title>
              <a-space>
                <a-button v-if="showCreateBtn" type="primary" v-auth="btnAuth.create" @click="createCallback">
                  新增
                </a-button>
                <a-button v-if="showRemoveBtn" type="danger" v-auth="btnAuth.remove" @click="removeCallback">
                  删除
                </a-button>
                <slot name="titleBtn"></slot>
                <a-dropdown v-if="showCacheBtn" :trigger="['click']" placement="bottom">
                  <a-button type="danger" @click.prevent>
                    缓存操作
                  </a-button>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a-button type="text" v-auth="btnAuth.refreshCache" @click="refreshCacheCallback">
                          刷新缓存
                        </a-button>
                      </a-menu-item>
                      <a-menu-divider/>
                      <a-menu-item>
                        <a-button type="text" v-auth="btnAuth.cleanCache" @click="cleanCacheCallback">
                          清空缓存
                        </a-button>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </a-space>
            </template>
            <a-table bordered :columns="columns" :data-source="tableData" :pagination="searchModel" :row-key="rowKeyField" :row-selection="rowSelection" @change="pageChange">
              <template #bodyCell="{ column, record }">
                <template v-if="column.slot === 'action'">
                  <slot name="action" :record="record"></slot>
                  <a-button v-if="showRowEditBtn" type="link" v-auth="btnAuth.rowEdit" @click="rowEditCallback(record)">编辑</a-button>
                  <view v-auth="btnAuth.rowRemove">
                    <a-popconfirm v-if="showRowRemoveBtn" title="删除后将无法恢复!"  @confirm="rowRemoveCallback(record)">
                      <a-button type="link">删除</a-button>
                    </a-popconfirm>
                  </view>
                </template>
                <template v-else>
                  <slot :name="column.slot" :record="record"></slot>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-row>
      </a-col>
    </a-row>
  </view>
</template>

<script setup lang="ts">
import {PageModel} from "@/api/interface/base";
import {reactive} from "vue";
import {message, Modal} from "ant-design-vue";
import {BtnAuth} from "@/components/table/index";

const emits = defineEmits(['treeSelectCallback', 'searchCallback', 'resetCallback', 'createCallback', 'removeCallback', 'refreshCacheCallback', 'cleanCacheCallback', 'rowSelectCallback', 'pageChange', 'rowEditCallback', 'rowRemoveCallback'])

const props = withDefaults(
  defineProps<{
    btnAuth?: any
    showTree?: boolean
    treeData?: Array<any>
    fieldNames?: any
    showSearch?: boolean
    searchModel?: any
    showCreateBtn?: boolean
    showRemoveBtn?: boolean
    showCacheBtn?: boolean
    columns?: Array<any>
    tableData?: Array<any>
    rowKeys?: any
    rowKeyField?: string
    showRowEditBtn?: boolean
    showRowRemoveBtn?: boolean
  }>(), {
    btnAuth: new BtnAuth(),
    showTree: false,
    treeData: <any>[],
    showSearch: true,
    searchModel: new PageModel(),
    showCacheBtn: false,
    showCreateBtn: true,
    showRemoveBtn: true,
    columns: <any>[],
    rowKeys: <any>[],
    tableData: <any>[],
    rowKeyField: 'id',
    showRowEditBtn: true,
    showRowRemoveBtn: true,
  }
);

const rowSelection = reactive({
  checkStrictly: false,
  onChange: (rowKeys: (string | number)[], rows: any[]) => {
    emits('rowSelectCallback', rowKeys, rows);
  }
});

/**
 * 点击树节点回调
 * @param selectedKeys
 * @param e
 */
const treeSelectCallback = (selectedKeys: any, e: any) => {
  emits('treeSelectCallback', selectedKeys, e);
}

/**
 * 页码切换回调
 * @param page
 * @param pageSize
 */
const pageChange = (page: any, pageSize: object) => {
  props.searchModel!.current = page.current;
  props.searchModel!.pageSize = page.pageSize;
  props.searchModel!.total = page.total;
  emits('searchCallback');
}

/**
 * 搜索回调
 */
const searchCallback = () => {
  props.searchModel.current = 1;
  props.searchModel.pageSize = 10;
  emits('searchCallback');
}

/**
 * 重置搜索回调
 */
const resetCallback = () => {
  emits('resetCallback');
}

/**
 * 新增回调
 */
const createCallback = () => {
  emits('createCallback');
}

/**
 * 删除回调
 */
const removeCallback = () => {
  if (props.rowKeys && props.rowKeys.length) {
    Modal.confirm({
      title: '警告',
      content: '请确认是否删除所选数据，删除后将无法恢复!',
      maskClosable: true,
      onOk() {
        emits('removeCallback');
      },
      onCancel() {},
    })
  } else {
    message.error("请选择要删除的数据")
  }
}

/**
 * 刷新缓存回调
 */
const refreshCacheCallback = () => {
  Modal.confirm({
    title: '警告',
    content: '请确认是否刷新缓存!',
    maskClosable: true,
    onOk() {
      emits('refreshCacheCallback');
    },
    onCancel() {},
  })
}

/**
 * 清除缓存回调
 */
const cleanCacheCallback = () => {
  Modal.confirm({
    title: '警告',
    content: '请确认是否清除缓存!',
    maskClosable: true,
    onOk() {
      emits('cleanCacheCallback');
    },
    onCancel() {},
  })
}

/**
 * 行编辑
 * @param row
 */
const rowEditCallback = (row: any) => {
  emits('rowEditCallback', row);
}

/**
 * 行删除
 * @param row
 */
const rowRemoveCallback = (row: any) => {
  emits('rowRemoveCallback', row);
}
</script>

<style scoped>
.searchRow {
  margin-bottom: 20px;
}

.tableCard {
  width: 100%
}
</style>
