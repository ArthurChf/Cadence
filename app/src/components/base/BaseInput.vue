<template>
    <div class="flex flex-col gap-2">
        <label v-if="label" :for="id" class="text-sm font-medium text-title">{{ label }}</label>
        <input
            :id
            v-model="value"
            :name
            :type
            class="rounded-2xl border-2 px-6 py-5 text-md outline-none transition-[border-color] bg-input-bg text-input-fg placeholder:text-input-placeholder"
            :class="error ? 'border-danger' : 'border-input-border focus:border-ring'"
        />
        <p v-if="error" class="text-sm text-danger">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { useFormField } from '#/composables/useFormField';
import { useId } from 'vue';

const { name } = defineProps<{
    type: 'text';
    name: string;
    label?: string;
}>();

const { value, error } = useFormField<string>(() => name);
const id = useId();
</script>
