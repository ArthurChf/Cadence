<template>
    <nav class="flex justify-evenly items-center border-t border-nav-border py-4">
        <RouterLink
            v-for="item in navItems"
            :key="item.route"
            class="flex flex-col items-center gap-1 transition active:bg-nav-item-bg-active focus:bg-nav-item-bg-active rounded-lg px-4 py-3"
            :class="item.route === route.path ? 'text-nav-item-label-active' : 'text-nav-item'"
            :to="item.route"
            :inert="item.disabled"
            @contextmenu.prevent
        >
            <BaseIcon :name="item.icon" size="sm" class="transition-[color]" :class="item.route === route.path && 'text-nav-item-icon-active'" />
            <span>{{ item.label }}</span>
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { useTranslation } from '#/composables/useTranslation';
import type { RouteType } from '#/enums/Route';
import type { IconName } from '#/types/ui';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseIcon from './base/BaseIcon.vue';


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
        label: t('pages.today.title')
    },
    {
        route: '/program',
        icon: 'calendar-days',
        label: t('pages.program.title')
    },
    {
        route: '/progress',
        icon: 'chart-column',
        label: t('pages.progress.title'),
        disabled: true
    },
    {
        route: '/settings',
        icon: 'settings',
        label: t('pages.settings.title'),
        disabled: true
    }
]);
</script>
