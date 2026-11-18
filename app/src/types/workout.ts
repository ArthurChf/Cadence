import type { CatalogExercise } from '#/types/catalog';

type Timestamp = number;

/**
 * 1 = Monday
 *
 * 7 = Sunday
 */
type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type SetValues = {
    repetitions: number | null;
    /** Weight in kg */
    weight: number | null;
    /** Duration in seconds */
    duration: number | null;
    restPeriod: number;
};

/* ==================== Planned ==================== */

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
} & SetValues;


/* ==================== Performed ==================== */

type PerformedSessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
type PerformedItemStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';

export type PerformedSession = {
    id: number;
    plannedSessionId: PlannedSession['id'] | null;
    plannedSessionName: PlannedSession['name'];
    startedAt: Timestamp;
    completedAt: Timestamp | null;
    status: PerformedSessionStatus;
};

export type PerformedExercise = {
    id: number;
    performedSessionId: PerformedSession['id'];
    plannedExerciseId: PlannedExercise['id'] | null;
    exerciseKey: CatalogExercise['key'];
    position: number;
    status: PerformedItemStatus;
};

export type PerformedSet = {
    id: number;
    performedExerciseId: PerformedExercise['id'];
    plannedSetId: PlannedSet['id'] | null;
    position: number;
    restStartedAt: Timestamp | null;
    status: PerformedItemStatus;
} & SetValues;
