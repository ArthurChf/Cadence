<template>
    <DuplicatePlannedSessionBottomSheet
        :sessions
        v-model:open="isDuplicatePlannedSessionBottomSheetOpen"
        v-model:select="sessionToDuplicate"
    />

    <Page>
        <template #header>
            <PageHeader :title="t('program.createSession.title')" :previous-title="t('program.title')" previous-route="/program" />
        </template>

        <div class="space-y-7">
            <BaseForm :id="formId" v-model:state="formState" :schema="createPlannedSessionFormSchema" @submit="submitForm">
                <BaseInput type="text" name="name" label="NOM" required />
                <DayPicker name="days" :occupied-days />
                <BaseRadioGroup name="startingPoint" :label="t('program.createSession.startingPoint')">
                    <BaseRadioCard
                        v-for="startingPoint in startingPoints"
                        :key="startingPoint"
                        :value="startingPoint"
                        :title="t(`program.createSession.startingPointOptions.${startingPoint}.title`)"
                        :description="t(`program.createSession.startingPointOptions.${startingPoint}.description`)"
                    />
                </BaseRadioGroup>
                <div v-if="formState.startingPoint === 'duplicate'" class="flex flex-col gap-3">
                    <BaseCard variant="link" @click="openDuplicateSessionSheet()">
                        <div class="flex flex-1 items-center justify-between gap-6">
                            <div class="flex items-center gap-6">
                                <div class="text-card-duplicate-icon bg-card-duplicate-icon-bg p-5 rounded-xl">
                                    <BaseIcon name="copy-check" size="md" />
                                </div>
                                <div v-if="sessionToDuplicate" class="flex flex-col">
                                    <span class="font-semibold text-radio-card-title-fg">{{ sessionToDuplicate.name }}</span>
                                    <span class="text-sm font-medium text-radio-card-fg">{{ t('common.exercisesCount', { n: sessionToDuplicate.exercisesCount }) }}</span>
                                </div>
                                <div v-else class="flex flex-col">
                                    <span class="font-semibold text-radio-card-title-fg">{{ t('program.createSession.startingPointOptions.duplicate.choiceTitleEmpty') }}</span>
                                    <span class="text-sm font-medium text-radio-card-fg">{{ t('program.createSession.startingPointOptions.duplicate.choiceSubtitleEmpty', { n: 2 }) }}</span>
                                </div>
                            </div>
                            <span v-if="sessionToDuplicate" class="text-sm font-semibold text-card-duplicate-action">{{ t('common.change') }}</span>
                        </div>
                    </BaseCard>
                    <BaseFieldError name="sessionToDuplicateId" />
                </div>
            </BaseForm>
            <BaseButton type="submit" :form="formId" :text="t('common.actions.create')" />
        </div>
    </Page>
</template>

<script setup lang="ts">
import BaseButton from '#/components/base/BaseButton.vue';
import BaseCard from '#/components/base/BaseCard.vue';
import BaseFieldError from '#/components/base/BaseFieldError.vue';
import BaseForm from '#/components/base/BaseForm.vue';
import BaseIcon from '#/components/base/BaseIcon.vue';
import BaseInput from '#/components/base/BaseInput.vue';
import BaseRadioCard from '#/components/base/BaseRadioCard.vue';
import BaseRadioGroup from '#/components/base/BaseRadioGroup.vue';
import Page from '#/components/Page.vue';
import PageHeader from '#/components/PageHeader.vue';
import DayPicker from '#/components/program/DayPicker.vue';
import DuplicatePlannedSessionBottomSheet from '#/components/program/DuplicatePlannedSessionBottomSheet.vue';
import { useTranslation } from '#/composables/useTranslation';
import type { Day, PlannedSession } from '#/types/program';
import type { SessionToDuplicate } from '#/types/ui';
import type { CreatePlannedSessionFormInput, CreatePlannedSessionFormOutput } from '#shared/schemas/program/createPlannedSession';
import { createPlannedSessionFormSchema } from '#shared/schemas/program/createPlannedSession';
import { onMounted, ref, useId, watch } from 'vue';

const sessions = ref<SessionToDuplicate[]>([]);
const isDuplicatePlannedSessionBottomSheetOpen = ref(false);
const sessionToDuplicate = ref<SessionToDuplicate>();

const formId = useId();
const { t } = useTranslation();

const formState = ref<CreatePlannedSessionFormInput>({
    name: '',
    days: new Set(),
    startingPoint: 'scratch',
    sessionToDuplicateId: undefined
});

const occupiedDays = ref<Map<Day, PlannedSession['name']>>(new Map([
    [1, 'nom lundi'],
    [3, 'nom mercredi'],
    [5, 'nom vendredi']
]));

const startingPoints = createPlannedSessionFormSchema.shape.startingPoint.options;

function submitForm(values: CreatePlannedSessionFormOutput) {
    console.warn({ values });
}

watch(sessionToDuplicate, () => {
    formState.value.sessionToDuplicateId = sessionToDuplicate.value?.id;
});

function openDuplicateSessionSheet() {
    if (formState.value.startingPoint === 'duplicate') {
        isDuplicatePlannedSessionBottomSheetOpen.value = true;
    }
}

watch(() => formState.value.startingPoint, () => {
    if (formState.value.startingPoint === 'scratch') {
        sessionToDuplicate.value = undefined;
        formState.value.sessionToDuplicateId = undefined;
    }

    openDuplicateSessionSheet();
});

onMounted(() => {
    console.log('on mounted');
    // todo : get the planned sessions and exercises count
});
</script>
