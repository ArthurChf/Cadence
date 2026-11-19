<template>
    <button type="button" class="flex items-center justify-center gap-4 cursor-pointer transition-[background-color] rounded-2xl w-full px-8 py-6 font-semibold" :class="variants[variant]" @click="emit('click')">
        <BaseIcon v-if="icon" :name="icon" size="md" />
        <span>{{ text }}</span>
    </button>
</template>

<script setup lang="ts">
import BaseIcon from '#/components/base/BaseIcon.vue';
import type { IconName } from '#/types/ui';
import { tw } from '#/utils/tailwindcss';

type ButtonVariant =
    'primary'
    | 'secondary';

const { variant = 'primary' } = defineProps<{
    text: string;
    icon?: IconName;
    variant?: ButtonVariant;
}>();

const emit = defineEmits<(e: 'click') => void>();

const variants: Record<ButtonVariant, string> = {
    primary: tw('bg-primary active:bg-primary-active focus:bg-primary-active'),
    secondary: tw('bg-secondary active:bg-secondary-active focus:bg-secondary-active')
};
</script>
