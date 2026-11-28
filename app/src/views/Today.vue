<template>
    <Page>
        <template #header>
            <PageHeader :title="t('today.title')" />
        </template>

        <div>
            <BaseButton :text="t('today.actions.startSession')" />
        </div>
    </Page>
</template>

<script setup lang="ts">
import BaseButton from '#/components/base/BaseButton.vue';
import Page from '#/components/Page.vue';
import PageHeader from '#/components/PageHeader.vue';

import { useTranslation } from '#/composables/useTranslation';

const { t } = useTranslation();
</script>
