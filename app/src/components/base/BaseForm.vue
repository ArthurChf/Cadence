<template>
    <form class="flex flex-col w-full" @submit.prevent="submit()" novalidate>
        <slot />
    </form>
</template>

<script setup lang="ts" generic="TSchema extends StandardSchemaV1">
import type { FormField } from '#/composables/useFormField';
import { formContextKey } from '#/composables/useFormField';
import { useRegleSchema } from '@regle/schemas';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { provide, toRef } from 'vue';

const { schema } = defineProps<{
    schema: TSchema;
}>();

const emit = defineEmits<(e: 'submit', values: StandardSchemaV1.InferOutput<TSchema>) => void>();

const state = defineModel<StandardSchemaV1.InferInput<TSchema>>('state', { required: true });

const { r$ } = useRegleSchema(state, toRef(() => schema as StandardSchemaV1));

provide(formContextKey, {
    getField: (name: string) => {
        return r$.$fields[name] as FormField | undefined;
    }
});

async function submit() {
    const { valid, data } = await r$.$validate();

    if (valid) {
        emit('submit', data);
    }
}
</script>
