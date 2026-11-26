import { i18n } from '#/i18n';
import { decodeValidationMessage } from '#shared/validation/message';

export function translateValidationMessage(raw: string): string {
    const message = decodeValidationMessage(raw);

    if (!message) {
        return raw;
    }

    return i18n.global.t(`validation.${message.key}`, message.params ?? {});
}
