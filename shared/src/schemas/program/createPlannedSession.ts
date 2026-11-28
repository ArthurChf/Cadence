import { validationMessage } from '#shared/validation/message';
import { z } from 'zod';

const createPlannedSessionFormSchema = z.object({
    name: z.string()
        .trim()
        .min(4, { error: validationMessage('tooShort') })
        .max(30, { error: validationMessage('tooLong') }),
    days: z.custom<Set<number>>(),
    startingPoint: z.enum(['scratch', 'duplicate']),
    sessionToDuplicateId: z.number().optional()
}).superRefine(({ startingPoint, sessionToDuplicateId }, ctx) => {
    if (startingPoint === 'duplicate' && sessionToDuplicateId === undefined) {
        ctx.addIssue({ path: ['sessionToDuplicateId'], code: 'custom', message: validationMessage('selectionRequired') });
    }
});

type CreatePlannedSessionFormInput = z.input<typeof createPlannedSessionFormSchema>;

type CreatePlannedSessionFormOutput = z.output<typeof createPlannedSessionFormSchema>;

export {
    CreatePlannedSessionFormInput,
    CreatePlannedSessionFormOutput,
    createPlannedSessionFormSchema
};
