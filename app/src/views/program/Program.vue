<template>
    <Page>
        <template #header>
            <PageHeader :title="t('program.title')">
                <template #actions>
                    <BaseButton variant="secondary" icon="plus" :to="Route.PROGRAM_CREATE_PLANNED_SESSION" />
                </template>
            </PageHeader>
        </template>

        <div class="flex flex-col items-stretch gap-5">
            <template v-for="card in programCards" :key="card.day">
                <BaseCard v-if="card.variant === 'assigned'" variant="link" @click="onCardClick(card)">
                    <div class="flex flex-1 items-center justify-between gap-6">
                        <div class="flex items-center gap-6">
                            <div class="flex items-center justify-center text-xs rounded-2xl w-32 h-22 font-semibold bg-card-day-bg text-card-day-fg">{{ t(`common.days.${card.day}`) }}</div>
                            <div class="flex flex-col gap-2">
                                <p class="font-semibold text-card-title-fg">{{ card.name }}</p>
                                <span class="text-sm">{{ t('common.exercisesCount', { n: card.exercisesCount }) }}</span>
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
                                <div class="flex items-center justify-center text-card-day-fg text-xs rounded-2xl w-32 h-22 font-semibold">{{ t(`common.days.${card.day}`) }}</div>
                                <p class="font-medium">{{ t('program.card.rest') }}</p>
                            </div>
                            <span v-if="card.day === todayIndex" class="text-xs font-bold rounded-full bg-card-today-bg text-card-today-fg py-2 px-3.5">{{ t('common.today') }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-card-outline-action">
                            <BaseIcon name="plus" size="xs" />
                            <span class="text-sm font-semibold">{{ t('program.card.assign') }}</span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </Page>
</template>

<script setup lang="ts">
import BaseButton from '#/components/base/BaseButton.vue';
import BaseCard from '#/components/base/BaseCard.vue';
import BaseIcon from '#/components/base/BaseIcon.vue';
import Page from '#/components/Page.vue';
import PageHeader from '#/components/PageHeader.vue';
import { useTranslation } from '#/composables/useTranslation';
import { Route } from '#/enums/Route';
import type { Day, PlannedSession } from '#/types/program';
import { getDay } from 'date-fns';

const { t } = useTranslation();

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
