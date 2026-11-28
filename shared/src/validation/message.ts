import type validationMessages from '#shared/locales/en/validation.json';

/** Keys of the validation messages. `en` is the reference locale. */
export type ValidationMessageName = keyof typeof validationMessages;

/** Full i18n key of a validation message, as stored in an issue's `message`. */
export type ValidationMessageKey = `validation.${ValidationMessageName}`;

/**
 * The parts of a schema issue needed to translate it.
 * The message is an i18n key, the other fields are its interpolation params.
 */
export type ValidationIssue = {
    message: string;
    minimum?: number | bigint;
    maximum?: number | bigint;
    /** Custom params, set with `.refine(check, { error, params })`. */
    params?: Record<string, unknown>;
};

/** Returns the i18n key of a validation message, with autocompletion. */
export function validationMessage(name: ValidationMessageName): ValidationMessageKey {
    return `validation.${name}`;
}

/** Returns the interpolation params of an issue, e.g. `{ minimum: 5 }` for `{minimum}` in a message. */
export function getValidationParams(issue: ValidationIssue): Record<string, unknown> {
    return {
        ...issue.params,
        ...(issue.minimum !== undefined && { minimum: Number(issue.minimum) }),
        ...(issue.maximum !== undefined && { maximum: Number(issue.maximum) })
    };
}
