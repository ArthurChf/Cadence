<template>
    <nav class="flex justify-evenly items-center border-t border-nav-border">
        <RouterLink
            v-for="item in navItems"
            :key="item.route"
            class="group flex flex-col items-center gap-2 transition active:text-nav-item-label-active px-4 py-5"
            :class="item.route === route.path ? 'text-nav-item-label-active' : 'text-nav-item'"
            :to="item.route"
            :inert="item.disabled"
            @contextmenu.prevent
        >
            <BaseIcon :name="item.icon" size="md" class="transition-[color] group-active:text-nav-item-icon-active" :class="item.route === route.path && 'text-nav-item-icon-active'" />
            <span class="font-medium text-sm">{{ item.label }}</span>
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
import BaseIcon from '#/components/base/BaseIcon.vue';
import { useTranslation } from '#/composables/useTranslation';
import type { RouteType } from '#/enums/Route';
import type { IconName } from '#/types/ui';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { t } = useTranslation();

type NavItem = {
    route: RouteType;
    icon: IconName;
    label: string;
    disabled?: boolean;
};

const route = useRoute();

const navItems = computed<NavItem[]>(() => [
    {
        route: '/today',
        icon: 'dumbbell',
        label: t('today.title')
    },
    {
        route: '/program',
        icon: 'calendar-days',
        label: t('program.title')
    },
    {
        route: '/progress',
        icon: 'chart-column',
        label: t('progress.title'),
        disabled: true
    },
    {
        route: '/settings',
        icon: 'settings',
        label: t('settings.title'),
        disabled: true
    }
]);
</script>
