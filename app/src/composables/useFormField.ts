import { translateValidationIssue } from '#/utils/validation';
import type { ValidationIssue } from '#shared/validation/message';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import { computed, inject, toValue, watchEffect } from 'vue';

export type FormField = {
    $value: unknown;
    /** Raw schema issues: unlike `$errors`, they keep the message params. */
    readonly $issues: ValidationIssue[];
};

type FormContext = {
    getField(name: string): FormField | undefined;
};

type FieldBinding<T> = {
    value: Ref<T>;
    error: ComputedRef<string>;
};

export const formContextKey: InjectionKey<FormContext> = Symbol('FormContext');

function bindFormField<T>(form: FormContext, name: () => string): FieldBinding<T> {
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
        return translateValidationIssue(field.value?.$issues?.[0]);
    });

    return { value, error };
}

/**
 * Binds a component to a field of the parent <BaseForm>.
 * Use it for components that only make sense inside a form.
 */
export function useFormField<T>(name: () => string): FieldBinding<T> {
    const form = inject(formContextKey, null);

    if (!form) {
        throw new Error('useFormField() must be used inside a <BaseForm>.');
    }

    return bindFormField<T>(form, name);
}

/**
 * Binds a component to a field of the parent <BaseForm> when there is one and a name is given.
 * Otherwise, uses `fallback` (usually the component's v-model) and never reports an error.
 */
export function useOptionalFormField<T>(name: () => string | undefined, fallback: Ref<T>): FieldBinding<T> {
    const form = inject(formContextKey, null);

    if (form && toValue(name)) {
        return bindFormField<T>(form, () => toValue(name) ?? '');
    }

    return {
        value: fallback,
        error: computed(() => '')
    };
}
