import { validationMessage } from '#shared/validation/message';
import { z } from 'zod';

/**
 * Default message of each issue, as an i18n key.
 * A schema can still override it: `.min(5, { error: validationMessage('...') })`.
 */
const validationErrorMap: z.core.$ZodErrorMap = (issue) => {
    switch (issue.code) {
        case 'invalid_type':
            return issue.input === undefined || issue.input === null
                ? validationMessage('required')
                : validationMessage('invalid');

        case 'too_small':
            if (issue.origin === 'string') {
                return issue.input === '' ? validationMessage('required') : validationMessage('tooShort');
            }

            return issue.origin === 'number' || issue.origin === 'bigint'
                ? validationMessage('tooSmall')
                : validationMessage('tooFewItems');

        case 'too_big':
            if (issue.origin === 'string') {
                return validationMessage('tooLong');
            }

            return issue.origin === 'number' || issue.origin === 'bigint'
                ? validationMessage('tooBig')
                : validationMessage('tooManyItems');

        default:
            return validationMessage('invalid');
    }
};

/** Makes every schema produce translatable messages. Call it once at startup (app, API…). */
export function configureValidation() {
    z.config({ customError: validationErrorMap });
}
