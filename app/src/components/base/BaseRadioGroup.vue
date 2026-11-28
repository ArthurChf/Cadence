<template>
    <fieldset class="flex flex-col gap-3 min-w-0">
        <legend v-if="label" class="mb-3">
            <BaseLabel :required>{{ label }}</BaseLabel>
        </legend>
        <slot />
        <BaseFieldError v-if="name" :name />
    </fieldset>
</template>

<script setup lang="ts" generic="T extends RadioValue">
import BaseFieldError from '#/components/base/BaseFieldError.vue';
import BaseLabel from '#/components/base/BaseLabel.vue';
import { useOptionalFormField } from '#/composables/useFormField';
import type { RadioValue } from '#/composables/useRadioGroup';
import { radioGroupContextKey } from '#/composables/useRadioGroup';
import { computed, provide, useId } from 'vue';

const { name } = defineProps<{
    /** Inside a <BaseForm>, binds the group to the form field with this name. */
    name?: string;
    label?: string;
    required?: boolean;
}>();

const model = defineModel<T>();

const { value } = useOptionalFormField(() => name, model);

// Radios need a shared name to behave as one group (arrow key navigation, single selection).
const fallbackName = useId();

provide(radioGroupContextKey, {
    name: computed(() => name ?? fallbackName),
    isSelected: (radioValue) => value.value === radioValue,
    select: (radioValue) => {
        value.value = radioValue as T;
    }
});
</script>
