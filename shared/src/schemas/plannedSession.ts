import { encodeValidationMessage, ValidationMessageKey } from '#shared/validation/message';
import { z } from 'zod';

const required = encodeValidationMessage(ValidationMessageKey.REQUIRED);

export const plannedSessionFormSchema = z.object({
    name: z.string({ error: required })
        .trim()
        .min(1, { error: required })
        .max(50, {
            error: encodeValidationMessage(ValidationMessageKey.MAX_LENGTH, { max: 50 })
        })
});

/** Raw values, as typed by the user */
export type PlannedSessionFormInput = z.input<typeof plannedSessionFormSchema>;

/** Validated and transformed values (e.g. trimmed name) */
export type PlannedSessionFormOutput = z.output<typeof plannedSessionFormSchema>;
