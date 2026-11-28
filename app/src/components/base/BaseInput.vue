<template>
    <div class="flex flex-col gap-3">
        <BaseLabel v-if="label" :id :required>{{ label }}</BaseLabel>
        <input
            :id
            v-model="value"
            :name
            :type
            class="rounded-2xl border-2 px-6 py-5 text-md outline-none transition-[border-color] bg-input-bg text-input-fg"
            :class="error ? 'border-danger ring-danger' : 'border-input-border'"
            autocomplete="off"
        />
        <BaseFieldError :name />
    </div>
</template>

<script setup lang="ts">
import BaseFieldError from '#/components/base/BaseFieldError.vue';
import BaseLabel from '#/components/base/BaseLabel.vue';
import { useFormField } from '#/composables/useFormField';
import { useId } from 'vue';

const { name } = defineProps<{
    type: 'text';
    name: string;
    label?: string;
    required?: boolean;
}>();

const { value, error } = useFormField<string>(() => name);
const id = useId();
</script>
