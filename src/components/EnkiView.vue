<script setup lang="ts">
import { PropType } from "vue";
defineProps({
    mode: {
        type: String as PropType<"default" | "out-in" | "in-out">,
        default: "out-in"
    }
});
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <template v-if="Component">
            <Transition :mode="mode">
                <KeepAlive>
                    <Suspense>
                        <component :is="Component" :key="route.path" />
                        <template #fallback>
                            Chargement...
                        </template>
                    </Suspense>
                </KeepAlive>
            </Transition>
        </template>
    </router-view>
</template>