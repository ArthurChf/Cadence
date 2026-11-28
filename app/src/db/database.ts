import type { PlannedExercise, PlannedSession, PlannedSet } from '#/types/program';
import type { PerformedExercise, PerformedSession, PerformedSet } from '#/types/workout';
import type { EntityTable } from 'dexie';
import { Dexie } from 'dexie';

export type DatabaseTables = {
    plannedSessions: EntityTable<PlannedSession, 'id'>;
    plannedExercises: EntityTable<PlannedExercise, 'id'>;
    plannedSets: EntityTable<PlannedSet, 'id'>;
    performedSessions: EntityTable<PerformedSession, 'id'>;
    performedExercises: EntityTable<PerformedExercise, 'id'>;
    performedSets: EntityTable<PerformedSet, 'id'>;
};

export type TableName = keyof DatabaseTables;

const schema = {
    plannedSessions: '++id, createdAt',
    plannedExercises: '++id, plannedSessionId',
    plannedSets: '++id, plannedExerciseId',
    performedSessions: '++id, plannedSessionId, status',
    performedExercises: '++id, key, performedSessionId, plannedExerciseId',
    performedSets: '++id, performedExerciseId, plannedSetId'
} as const satisfies Record<TableName, string>;

export const db = new Dexie('cadence') as Dexie & DatabaseTables;

db.version(1).stores(schema);

/* ==================== Type helpers ==================== */

type Trim<S extends string> =
    S extends ` ${infer Rest}` ? Trim<Rest>
        : S extends `${infer Rest} ` ? Trim<Rest>
        : S;

type SplitIndexes<S extends string> =
    S extends `${infer Head},${infer Tail}`
        ? Trim<Head> | SplitIndexes<Tail>
        : Trim<S>;

/** Removes Dexie modifiers: `++` (auto-increment), `&` (unique), `*` (multi-entry). */
type StripModifier<S extends string> = S extends `${'++' | '&' | '*'}${infer Name}` ? Name : S;

export type TableIndex<N extends TableName> = StripModifier<SplitIndexes<typeof schema[N]>>;
