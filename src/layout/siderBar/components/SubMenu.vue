<template>
	<a-sub-menu :key="menuInfo.key" v-if="menuInfo.children">
		<template #icon>
      <component :is="menuInfo.icon"/>
    </template>
		<template #title>{{ menuInfo.meta.title }}</template>
		<template v-for="item in menuInfo.children" :key="item.path">
			<template v-if="!item.children">
				<a-menu-item :key="item.path">
					<template #icon>
            <component :is="item.icon"/>
					</template>
					<router-link :to="{ path: item.path }">
						{{ item.meta.title }}
					</router-link>
				</a-menu-item>
			</template>
			<template v-else>
				<sub-menu :menu-info="item" :key="item.path" />
			</template>
		</template>
	</a-sub-menu>
</template>
<script setup lang="ts">
defineProps({
	menuInfo: {
		type: Object,
		default: () => ({}),
	},
});
</script>
