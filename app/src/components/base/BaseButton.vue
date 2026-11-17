<template>
    <button type="button" class="cursor-pointer transition-[background-color] rounded-lg w-fit px-8 py-4 font-semibold" :class="variants[variant]" @click="emit('click')">{{ text }}</button>
</template>

<script setup lang="ts">
import type { ButtonVariant } from '#/types/ui';
import { tw } from '#/utils/tailwindcss';

const { variant = 'primary' } = defineProps<{
    text: string;
    variant?: ButtonVariant;
}>();

const emit = defineEmits<(e: 'click') => void>();

const variants: Record<ButtonVariant, string> = {
    primary: tw('bg-primary hover:bg-primary-hover')
};
</script>
