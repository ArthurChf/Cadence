<template>
    <div class="flex flex-col gap-3">
        <BaseLabel>{{ label }}</BaseLabel>
        <slot />
    </div>
</template>

<script setup lang="ts">
import BaseLabel from '#/components/base/BaseLabel.vue';

defineProps<{
    label: string;
}>();
</script>
