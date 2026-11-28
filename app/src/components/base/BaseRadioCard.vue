<template>
    <label
        tabindex="0"
        class="flex items-center gap-5 rounded-2xl px-6 py-5 transition-[background-color] has-focus-visible:ring-2 has-focus-visible:ring-ring"
        :class="isChecked ? 'bg-radio-card-bg-checked' : 'bg-radio-card-bg focus:bg-radio-card-bg-active'"
    >
        <input
            type="radio"
            class="sr-only"
            :name="radioGroup.name.value"
            :value
            :checked="isChecked"
            @change="radioGroup.select(value)"
        />
        <span
            class="flex items-center justify-center rounded-full size-11 border-2 transition-[background-color,border-color]"
            :class="isChecked ? 'border-radio-card-indicator-checked bg-radio-card-indicator-checked text-radio-card-indicator-check' : 'border-radio-card-indicator'"
        >
            <BaseIcon v-if="isChecked" name="check" size="2xs" class="stroke-3" />
        </span>
        <div class="flex flex-col gap-2">
            <span class="font-semibold" :class="isChecked ? 'text-radio-card-title-fg-checked' : 'text-radio-card-title-fg'">
                <slot name="title">{{ title }}</slot>
            </span>
            <span v-if="description || $slots.description" class="text-sm font-medium" :class="isChecked ? 'text-radio-card-fg-checked' : 'text-radio-card-fg'">
                <slot name="description">{{ description }}</slot>
            </span>
        </div>
    </label>
</template>

<script setup lang="ts">
import BaseIcon from '#/components/base/BaseIcon.vue';
import type { RadioValue } from '#/composables/useRadioGroup';
import { useRadioGroup } from '#/composables/useRadioGroup';
import { computed } from 'vue';

const { value } = defineProps<{
    value: RadioValue;
    title?: string;
    description?: string;
}>();

defineSlots<{
    title?(): unknown;
    description?(): unknown;
}>();

const radioGroup = useRadioGroup();
const isChecked = computed(() => radioGroup.isSelected(value));
</script>
