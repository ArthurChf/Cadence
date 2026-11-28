<template>
    <div class="flex items-center justify-between gap-3">
        <div class="flex flex-col gap-3">
            <RouterLink v-if="previousTitle" class="flex items-center gap-3 text-header-previous-title focus:text-header-previous-title-focus" :to="previousRoute">
                <BaseIcon name="chevron-left" size="md" class="stroke-3" />
                <span class="font-semibold">{{ previousTitle }}</span>
            </RouterLink>
            <h1>{{ title }}</h1>
        </div>
        <div class="flex items-center gap-3">
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseIcon from '#/components/base/BaseIcon.vue';
import type { RouteType } from '#/enums/Route';

type HeaderPreviousPageProps =
    { previousTitle?: never; previousRoute?: never }
    | { previousTitle: string; previousRoute: RouteType };

defineProps<{
    title: string;
} & HeaderPreviousPageProps>();
</script>
