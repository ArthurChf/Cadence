<template>
    <p v-if="error" class="text-sm text-danger">{{ error }}</p>
</template>

<script setup lang="ts">
import { useFormField } from '#/composables/useFormField';

/**
 * Shows the error of a <BaseForm> field that has no input of its own
 * (e.g. a value picked in a bottom sheet).
 */
const { name } = defineProps<{
    name: string;
}>();

const { error } = useFormField(() => name);
</script>
