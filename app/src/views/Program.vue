<template>
    <BaseBottomSheet v-model:open="isBottomSheetOpen" detent="lg">
        <template #title>{{ t('pages.program.createSession') }}</template>
        <template #subtitle>{{ t('pages.program.title') }}</template>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure tenetur, eveniet saepe fugiat rem, unde quam tempora porro ut maxime nulla! Delectus, dicta molestias. Minus quasi repellat ratione cum nam.
        </template>
    </BaseBottomSheet>

    <div class="sticky top-0 py-10 bg-background">
        <h1>{{ t('pages.program.title') }}</h1>
    </div>

    <div class="flex flex-col items-stretch gap-5">
        <template v-for="card in programCards" :key="card.day">
            <BaseCard v-if="card.variant === 'assigned'" variant="link" @click="onCardClick(card)">
                <div class="flex flex-1 items-center justify-between gap-6">
                    <div class="flex items-center gap-6">
                        <div class="flex items-center justify-center text-xs rounded-2xl w-32 h-22 font-semibold bg-card-day-bg text-card-day-fg">{{ t(`common.day.${card.day}`) }}</div>
                        <div class="flex flex-col gap-2">
                            <p class="font-semibold text-md text-card-title-fg">{{ card.name }}</p>
                            <span class="text-sm">{{ t('pages.program.card.nbExercises', { n: card.exercisesCount }) }}</span>
                        </div>
                    </div>
                    <span v-if="card.day === todayIndex" class="text-xs font-bold rounded-full bg-card-today-bg text-card-today-fg py-2 px-3.5">{{ t('common.today') }}</span>
                </div>
            </BaseCard>
            <div
                v-else-if="card.variant === 'empty'"
                tabindex="0"
                @click="onCardClick(card)"
                class="border-2 border-card-outline-border text-card-fg rounded-2xl py-2 px-6 cursor-pointer focus:ring"
            >
                <div class="flex items-center justify-between gap-6">
                    <div class="flex flex-1 items-center justify-between">
                        <div class="flex items-center gap-6">
                            <div class="flex items-center justify-center text-card-day-fg text-xs rounded-2xl w-32 h-22 font-semibold">{{ t(`common.day.${card.day}`) }}</div>
                            <p class="font-medium text-md">{{ t('pages.program.card.rest') }}</p>
                        </div>
                        <span v-if="card.day === todayIndex" class="text-xs font-bold rounded-full bg-card-today-bg text-card-today-fg py-2 px-3.5">{{ t('common.today') }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-card-outline-action">
                        <BaseIcon name="plus" size="xs" />
                        <span class="text-sm font-semibold">{{ t('pages.program.card.assign') }}</span>
                    </div>
                </div>
            </div>
        </template>

        <BaseButton variant="secondary" icon="plus" :text="t('pages.program.createSession')" @click="isBottomSheetOpen = true" />
    </div>
</template>

<script setup lang="ts">
import BaseBottomSheet from '#/components/base/BaseBottomSheet.vue';
import BaseButton from '#/components/base/BaseButton.vue';
import BaseCard from '#/components/base/BaseCard.vue';
import BaseIcon from '#/components/base/BaseIcon.vue';

import { useTranslation } from '#/composables/useTranslation';
import type { Day, PlannedSession } from '#/types/workout';
import { getDay } from 'date-fns';
import { ref } from 'vue';

const { t } = useTranslation();

const isBottomSheetOpen = ref(false);

type ProgramCard = {
    day: Day;
} & ({
    variant: 'empty';
} | {
    variant: 'assigned';
    plannedSessionId: PlannedSession['id'];
    name: string;
    exercisesCount: number;
});

const todayIndex = getDay(Date.now());

const programCards: ProgramCard[] = [
    { day: 1, variant: 'empty' },
    { day: 2, variant: 'empty' },
    { day: 3, variant: 'empty' },
    { day: 4, variant: 'empty' },
    { day: 5, variant: 'empty' },
    { day: 6, variant: 'empty' },
    { day: 7, variant: 'empty' }
];

function onCardClick(card: ProgramCard) {

}
</script>
