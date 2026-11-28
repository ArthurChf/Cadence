<template>
    <div class="space-y-5">
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <BaseLabel>{{ t('common.days.title') }}</BaseLabel>
                <span>{{ t('program.dayPicker.legend') }}</span>
            </div>
            <div class="flex items-center gap-4">
                <div
                    v-for="day in 7"
                    :key="day"
                    tabindex="0"
                    class="flex flex-col justify-center items-center gap-2 rounded-2xl w-1/7 h-25 transition-[background-color]"
                    :class="[getDayBackgroundClass(day)]"
                    @click="toggleDay(day)"
                >
                    <span class="font-semibold text-day-picker-day-fg">{{ t(`common.dayInitials.${day}`) }}</span>
                    <div class="size-2.5 rounded-full transition-[background-color]" :class="[occupiedDays.has(day as Day) ? 'visible' : 'invisible', selectedDays.has(day) ? 'bg-day-picker-day-active-dot' : 'bg-day-picker-day-dot']" />
                </div>
            </div>
        </div>
        <div class="text-sm font-medium">
            <template v-if="selectedDays.size">
                <p v-for="line in summaryLines" class="text-day-picker-summary-alert-fg">{{ line }}</p>
            </template>
            <p v-else class="text-day-picker-summary-fg">{{ t('program.dayPicker.summaryNoDay') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseLabel from '#/components/base/BaseLabel.vue';
import { useFormField } from '#/composables/useFormField';
import { useTranslation } from '#/composables/useTranslation';
import type { Day, PlannedSession } from '#/types/program';
import { getSortedSet } from '#/utils/sort';
import { tw } from '#/utils/tailwindcss';
import { computed } from 'vue';

const { name, occupiedDays } = defineProps<{
    name: string;
    occupiedDays: Map<Day, PlannedSession['name']>;
}>();

const { t } = useTranslation();

const { value: selectedDays } = useFormField<Set<number>>(() => name);

function toggleDay(day: number) {
    if (selectedDays.value.has(day)) {
        selectedDays.value.delete(day);
    } else {
        selectedDays.value.add(day);
    }

    selectedDays.value = getSortedSet(selectedDays.value);
}

function getDayBackgroundClass(day: number) {
    if (selectedDays.value.has(day)) {
        if (occupiedDays.has(day as Day)) {
            return tw('bg-day-picker-day-occupied-bg-active focus:bg-day-picker-day-occupied-bg-active-focus');
        }

        return tw('bg-day-picker-day-bg-active focus:bg-day-picker-day-bg-active-focus');
    }

    return tw('bg-day-picker-day-bg focus:bg-day-picker-day-bg-focus');
}

const summaryLines = computed(() => {
    const lines: string[] = [];

    selectedDays.value.forEach((selectedDay) => {
        if (occupiedDays.has(selectedDay as Day)) {
            lines.push(t('program.dayPicker.summaryLine', {
                day: t(`common.days.${selectedDay}`),
                session: occupiedDays.get(selectedDay as Day)
            }));
        }
    });

    return lines;
});
</script>
