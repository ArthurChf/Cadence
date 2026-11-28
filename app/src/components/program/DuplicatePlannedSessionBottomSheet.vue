<template>
    <BaseBottomSheet v-model:open="isBottomSheetOpen" detent="lg">
        <template #title>{{ t('program.duplicateSessionSheet.title') }}</template>
        <template #subtitle>{{ t('program.createSession.title') }}</template>
        <template #content>
            <BaseRadioGroup v-model="sessionIdToDuplicate" :label="t('program.createSession.startingPoint')">
                <BaseRadioCard
                    v-for="session in filteredSessions"
                    :key="session.id"
                    :value="session.id"
                    :title="session.name"
                    :description="t('common.exercisesCount', { n: session.exercisesCount })"
                />
            </BaseRadioGroup>
        </template>
        <template #footer>
            <BaseButton :text="t('common.actions.duplicate')" :disabled="sessionIdToDuplicate === undefined || isSessionSelected" @click="confirmSelection()" />
        </template>
    </BaseBottomSheet>
</template>

<script setup lang="ts">
import BaseBottomSheet from '#/components/base/BaseBottomSheet.vue';
import BaseButton from '#/components/base/BaseButton.vue';
import BaseRadioCard from '#/components/base/BaseRadioCard.vue';
import BaseRadioGroup from '#/components/base/BaseRadioGroup.vue';
import { useTranslation } from '#/composables/useTranslation';
import type { PlannedSession } from '#/types/program';
import type { SessionToDuplicate } from '#/types/ui';
import { computed, ref, watch } from 'vue';

const { sessions } = defineProps<{
    sessions: SessionToDuplicate[];
}>();

const isBottomSheetOpen = defineModel<boolean>('open', { required: true });
const sessionToDuplicate = defineModel<SessionToDuplicate | undefined>('select', { required: true });

const sessionIdToDuplicate = ref<PlannedSession['id']>();
const isSessionSelected = ref(false);
const searchValue = ref('');
const { t } = useTranslation();

const filteredSessions = computed(() => {
    if (!searchValue.value) {
        return sessions;
    }

    return sessions.filter((s) => {
        return s.name.toLowerCase().includes(searchValue.value.toLowerCase());
    });
});

function confirmSelection() {
    if (sessionIdToDuplicate.value === undefined) {
        return;
    }

    sessionToDuplicate.value = sessions.find((s) => s.id === sessionIdToDuplicate.value)!;

    isSessionSelected.value = true;
    isBottomSheetOpen.value = false;
}

watch(sessionIdToDuplicate, () => {
    isSessionSelected.value = false;
});

watch(sessionToDuplicate, () => {
    sessionIdToDuplicate.value = sessionToDuplicate.value?.id;
});
</script>
