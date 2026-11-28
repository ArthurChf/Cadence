import type { ComputedRef, InjectionKey } from 'vue';
import { inject } from 'vue';

export type RadioValue = string | number;

export type RadioGroupContext = {
    readonly name: ComputedRef<string>;
    isSelected(value: RadioValue): boolean;
    select(value: RadioValue): void;
};

export const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('RadioGroupContext');

export function useRadioGroup() {
    const radioGroup = inject(radioGroupContextKey);

    if (!radioGroup) {
        throw new Error('useRadioGroup() must be used inside a <BaseRadioGroup>.');
    }

    return radioGroup;
}
