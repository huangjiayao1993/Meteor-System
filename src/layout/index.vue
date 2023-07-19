<template>
	<a-layout class="layout">
		<!-- 左侧菜单 -->
		<SiderBar :selectedKeys="selectedKeys"></SiderBar>
		<a-layout>
			<!-- 顶部栏 -->
			<NavBar></NavBar>
			<TabsBar #item="item">
				<!-- 内容区域 -->
				<a-layout-content class="layout-content">
					<router-view v-slot="{ Component }">
						<component :is="Component" :key="$route.fullPath" />
					</router-view>
				</a-layout-content>
			</TabsBar>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import SiderBar from "@/layout/siderBar/SiderBar.vue";
import NavBar from "@/layout/navBar/NavBar.vue";
import TabsBar from "@/layout/tabsBar/TabsBar.vue";
const route = useRoute();

const selectedKeys = ref<string[]>([route.path]);

watch(
	() => route.path,
	(path) => {
		selectedKeys.value = [path];
	}
);
</script>

<style scoped lang="scss">
:deep(.ant-tabs-content) {
	max-height: 86vh;
	overflow-y: auto;
	overflow-x: hidden;
}
.layout {
  overflow-y: auto;
	height: 100vh;
}
.layout-content {
	margin: 0 16px;
	padding: 24px;
	background: var(--page-bg-color);
	min-height: 40vh;
}
</style>
