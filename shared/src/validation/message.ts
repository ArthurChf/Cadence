const validationMessageKeys = [
    'required'
] as const;

type ValidationMessageKey = typeof validationMessageKeys[number];
type ValidationMessageParams = Record<string, string | number>;

type ValidationMessage = {
    key: ValidationMessageKey;
    params?: ValidationMessageParams;
};

function isValidationMessage(value: unknown): value is ValidationMessage {
    return typeof value === 'object'
        && value !== null
        && 'key' in value
        && typeof value.key === 'string'
        && (validationMessageKeys).includes(value.key as ValidationMessageKey);
}

function encodeValidationMessage(key: ValidationMessageKey, params?: ValidationMessageParams) {
    const message: ValidationMessage = params ? { key, params } : { key };

    return JSON.stringify(message);
}

function decodeValidationMessage(raw: string) {
    try {
        const parsed: unknown = JSON.parse(raw);

        return isValidationMessage(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

export {
    decodeValidationMessage, encodeValidationMessage
};
