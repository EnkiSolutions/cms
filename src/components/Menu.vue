<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    root: {
        type: String
    },
    routes: {
        type: Array as PropType<{ path: string, title: string, [k: string]: string }[]>,
        required: true
    }
});
const emits = defineEmits(["navigate"])
</script>

<template>
  	<nav class="menu">
		<router-link
			v-for="route in routes"
			@click="emits('navigate')"
			:to="(root ? `/${root}` : '') + `/${route.path}`"
			v-slot="{ href, navigate }"
		>
			<slot
				:route="route"
				:href="href"
				:navigate="navigate">
				{{ route.title }}
			</slot>
		</router-link>
	</nav>
</template>