<template>
    <div
        tabindex="0"
        @click="doAction()"
        class="bg-card-bg text-card-fg rounded-2xl py-5 px-6"
        :class="[variant === 'link' && 'cursor-pointer focus:ring focus:bg-card-day-bg-active']"
    >
        <div class="flex items-center justify-between gap-6">
            <slot />
            <BaseIcon name="chevron-right" size="sm" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseIcon from '#/components/base/BaseIcon.vue';
import type { RouteType } from '#/enums/Route';
import { useRouter } from 'vue-router';

const props = defineProps<{
    variant: 'link';
    route?: RouteType;
}>();

const router = useRouter();

function doAction() {
    if (props.variant === 'link' && props.route) {
        router.push(props.route);
    }
}
</script>
