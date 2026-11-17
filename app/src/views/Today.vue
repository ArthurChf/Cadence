<template>
    <h1 class="font-normal">{{ t('pages.today.title') }}</h1>
    <BaseButton :text="t('pages.today.actions.startSession')" />
</template>

<script setup lang="ts">
import BaseButton from '#/components/base/BaseButton.vue';
import { useTranslation } from '#/composables/useTranslation';

const { t } = useTranslation();
</script>
