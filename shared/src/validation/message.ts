/**
 * Validation messages are framework and language agnostic: a schema never holds
 * human-readable text, only an encoded key (+ params). Each side decides how to
 * render it (the front-end translates it with vue-i18n, the back-end can send it
 * as-is in an API error so the client translates it).
 */

export const ValidationMessageKey = {
    REQUIRED: 'required',
    MAX_LENGTH: 'maxLength'
} as const;

export type ValidationMessageKey = typeof ValidationMessageKey[keyof typeof ValidationMessageKey];

export type ValidationMessageParams = Record<string, string | number>;

export type ValidationMessage = {
    key: ValidationMessageKey;
    params?: ValidationMessageParams;
};

const validationMessageKeys: readonly string[] = Object.values(ValidationMessageKey);

function isValidationMessage(value: unknown): value is ValidationMessage {
    return typeof value === 'object'
        && value !== null
        && 'key' in value
        && typeof value.key === 'string'
        && validationMessageKeys.includes(value.key);
}

export function encodeValidationMessage(key: ValidationMessageKey, params?: ValidationMessageParams): string {
    const message: ValidationMessage = params ? { key, params } : { key };

    return JSON.stringify(message);
}

/**
 * Returns `null` when the message was not produced by `encodeValidationMessage`
 * (e.g. a default message from the schema library).
 */
export function decodeValidationMessage(raw: string): ValidationMessage | null {
    try {
        const parsed: unknown = JSON.parse(raw);

        return isValidationMessage(parsed) ? parsed : null;
    } catch {
        return null;
    }
}
