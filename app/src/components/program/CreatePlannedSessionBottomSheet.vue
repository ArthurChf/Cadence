<template>
    <BaseBottomSheet v-model:open="isBottomSheetOpen" detent="lg">
        <template #title>{{ t('pages.program.createSession') }}</template>
        <template #subtitle>{{ t('pages.program.title') }}</template>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure tenetur, eveniet saepe fugiat rem, unde quam tempora porro ut maxime nulla! Delectus, dicta molestias. Minus quasi repellat ratione cum nam.
        </template>
    </BaseBottomSheet>
</template>

<script setup lang="ts">
import BaseBottomSheet from '#/components/base/BaseBottomSheet.vue';
import { useTranslation } from '#/composables/useTranslation';

const isBottomSheetOpen = defineModel<boolean>('open', { required: true });
const { t } = useTranslation();
</script>
