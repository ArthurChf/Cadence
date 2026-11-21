import { translateValidationMessage } from '#/utils/validation';
import type { InjectionKey, MaybeRefOrGetter } from 'vue';
import { computed, inject, toValue, watchEffect } from 'vue';

/** Subset of a Regle field status that form controls rely on */
export type FormField = {
    $value: unknown;
    readonly $errors: string[];
};

export type FormContext = {
    getField(name: string): FormField | undefined;
};

export const formContextKey: InjectionKey<FormContext> = Symbol('FormContext');

/**
 * Binds a form control to the field `name` of the closest `<BaseForm>`.
 */
export function useFormField<T>(name: MaybeRefOrGetter<string>) {
    const form = inject(formContextKey);

    if (!form) {
        throw new Error('useFormField() must be used inside a <BaseForm>.');
    }

    const field = computed(() => form.getField(toValue(name)));

    if (import.meta.env.DEV) {
        watchEffect(() => {
            if (!field.value) {
                console.warn(`The field "${toValue(name)}" does not exist in the form schema.`);
            }
        });
    }

    const value = computed<T>({
        get: () => field.value?.$value as T,
        set: (newValue) => {
            if (field.value) {
                field.value.$value = newValue;
            }
        }
    });

    const error = computed(() => {
        return translateValidationMessage(field.value?.$errors?.[0] ?? '');
    });

    return { value, error };
}
