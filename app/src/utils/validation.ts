import { i18n } from '#/i18n';
import type { ValidationIssue } from '#shared/validation/message';
import { getValidationParams } from '#shared/validation/message';

/**
 * Translates a schema issue with its params.
 * Called at render time, so the message follows language changes.
 */
export function translateValidationIssue(issue: ValidationIssue | undefined): string {
    if (!issue) {
        return '';
    }

    // Not an i18n key (e.g. a raw message from a third-party schema): show it as is.
    if (!i18n.global.te(issue.message)) {
        return issue.message;
    }

    const params = getValidationParams(issue);
    // Picks the plural form, e.g. "1 character | {minimum} characters".
    const pluralCount = Number(params.minimum ?? params.maximum ?? 1);

    return i18n.global.t(issue.message, params, pluralCount);
}
