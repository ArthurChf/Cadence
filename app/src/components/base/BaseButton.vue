<template>
    <button
        :type
        :form
        :disabled
        class="flex items-center justify-center gap-4 cursor-pointer transition-[background-color,opacity] rounded-3xl w-full p-6 font-semibold text-button-fg disabled:cursor-not-allowed disabled:opacity-50"
        :class="variants[variant]"
        @click="onClick()"
    >
        <BaseIcon v-if="icon" :name="icon" size="md" />
        <span v-if="text">{{ text }}</span>
    </button>
</template>

<script setup lang="ts">
import BaseIcon from '#/components/base/BaseIcon.vue';
import type { RouteType } from '#/enums/Route';
import type { IconName } from '#/types/ui';
import { tw } from '#/utils/tailwindcss';
import { useRouter } from 'vue-router';

type ButtonVariant =
    'primary'
    | 'secondary';

type ButtonTypeProps =
    { type?: 'button'; form?: never }
    | { type: 'submit'; form: string };

type ButtonProps = {
    text?: string;
    icon?: IconName;
    variant?: ButtonVariant;
    to?: RouteType;
    disabled?: boolean;
} & ButtonTypeProps;

const { variant = 'primary', type = 'button', to } = defineProps<ButtonProps>();

const emit = defineEmits<(e: 'click') => void>();

const variants: Record<ButtonVariant, string> = {
    primary: tw('bg-primary active:bg-primary-active focus:bg-primary-active'),
    secondary: tw('bg-secondary active:bg-secondary-active focus:bg-secondary-active')
};

const router = useRouter();

function onClick() {
    if (to) {
        router.push(to);
    } else {
        emit('click');
    }
}
</script>
