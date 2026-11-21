import type { CatalogExercise } from '#/types/catalog';
import type { Timestamp } from '#/types/common';

/* ==================== Planned ==================== */

/**
 * 1 = Monday
 *
 * 7 = Sunday
 */
export type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ProgramSetValues = {
    repetitions: number | null;
    /** Weight in kg */
    weight: number | null;
    /** Duration in seconds */
    duration: number | null;
    restPeriod: number;
};

export type PlannedSession = {
    id: number;
    name: string;
    days: Day[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export type PlannedExercise = {
    id: number;
    plannedSessionId: PlannedSession['id'];
    exerciseKey: CatalogExercise['key'];
    position: number;
    createdAt: Timestamp;
};

export type PlannedSet = {
    id: number;
    plannedExerciseId: PlannedExercise['id'];
} & ProgramSetValues;
