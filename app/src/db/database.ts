import type { PerformedExercise, PerformedSession, PerformedSet, PlannedExercise, PlannedSession, PlannedSet } from '#/types/workout';
import type { EntityTable } from 'dexie';
import { Dexie } from 'dexie';

export const db = new Dexie('cadence') as Dexie & {
    plannedSessions: EntityTable<PlannedSession, 'id'>;
    plannedExercises: EntityTable<PlannedExercise, 'id'>;
    plannedSets: EntityTable<PlannedSet, 'id'>;
    performedSessions: EntityTable<PerformedSession, 'id'>;
    performedExercises: EntityTable<PerformedExercise, 'id'>;
    performedSets: EntityTable<PerformedSet, 'id'>;
};

db.version(1).stores({
    plannedSessions: '++id',
    plannedExercises: '++id, plannedSessionId',
    plannedSets: '++id, plannedExerciseId',
    performedSessions: '++id, plannedSessionId, status',
    performedExercises: '++id, key, performedSessionId, plannedExerciseId',
    performedSets: '++id, performedExerciseId, plannedSetId'
});
