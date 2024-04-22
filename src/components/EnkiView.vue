<script setup lang="ts">
import { PropType } from "vue";
import { RouterView } from "vue-router"
defineProps({
    mode: {
        type: String as PropType<"default" | "out-in" | "in-out">,
        default: "out-in"
    }
});
</script>

<template>
    <RouterView v-slot="{ Component, route }">
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
    </RouterView>
</template>