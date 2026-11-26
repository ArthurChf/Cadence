<template>
    <label :for="id" class="flex items-center gap-1 text-sm font-medium text-label-fg uppercase">
        <slot />
        <span v-if="required" class="text-danger font-medium">*</span>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    id?: string;
    required?: boolean;
}>();
</script>
