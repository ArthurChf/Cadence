<template>
    <div class="flex flex-col gap-10 py-10">
        <h1>Test</h1>

        <BaseForm v-model:state="state" :schema="plannedSessionFormSchema" class="gap-8" @submit="onSubmit">
            <BaseInput type="text" name="name" :label="t('forms.plannedSession.name.label')" :placeholder="t('forms.plannedSession.name.placeholder')" />
            <BaseButton type="submit" :text="t('common.validate')" />
        </BaseForm>

        <div>
            <h2>state</h2>
            <pre>{{ state }}</pre>
        </div>

        <div>
            <h2>submittedValues</h2>
            <pre>{{ submittedValues }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '#/components/base/BaseButton.vue';
import BaseForm from '#/components/base/BaseForm.vue';
import BaseInput from '#/components/base/BaseInput.vue';
import { useTranslation } from '#/composables/useTranslation';
import type { PlannedSessionFormInput, PlannedSessionFormOutput } from '#shared/schemas/plannedSession';
import { plannedSessionFormSchema } from '#shared/schemas/plannedSession';
import { ref } from 'vue';

const { t } = useTranslation();

const state = ref<PlannedSessionFormInput>({ name: 'testzeiruhzeiurhritestzeiruhzeiurhritestzeiruhzeiurhri' });
const submittedValues = ref<PlannedSessionFormOutput | null>(null);

function onSubmit(values: PlannedSessionFormOutput) {
    submittedValues.value = values;
}
</script>
