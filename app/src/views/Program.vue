<template>
    <h1>{{ t('pages.program.title') }}</h1>
</template>

<script setup lang="ts">
import { useTranslation } from '#/composables/useTranslation';

const { t } = useTranslation();
</script>
