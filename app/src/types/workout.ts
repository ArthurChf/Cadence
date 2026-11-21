import type { CatalogExercise } from '#/types/catalog';
import type { Timestamp } from '#/types/common';
import type { PlannedExercise, PlannedSession, PlannedSet, ProgramSetValues } from '#/types/program';

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
} & ProgramSetValues;
