import { useRepository } from '#/composables/useRepository';
import type { PlannedSession } from '#/types/program';
import type { QueryResult } from '#/types/query';
import { QueryException, runQuery } from '#/utils/query';

export type PlannedSessionSummary = PlannedSession & {
    exercisesCount: number;
};

const plannedSessionsRepository = useRepository('plannedSessions');
const plannedExercisesRepository = useRepository('plannedExercises');

/**
 * Queries on planned sessions. Each query is awaited and never throws:
 * it resolves to `{ data, error: null }` or `{ data: null, error }`.
 */
export function usePlannedSessions() {
    /**
     * Every planned session ordered by creation date (oldest first), with its exercises count.
     *
     * Two IndexedDB requests, whatever the number of sessions: the sessions, and the
     * `plannedSessionId` index keys of the exercises (records are not loaded).
     */
    async function getPlannedSessions(): Promise<QueryResult<PlannedSessionSummary[]>> {
        return runQuery(async () => {
            const [plannedSessions, exercisesSessionIds] = await Promise.all([
                plannedSessionsRepository.getAllOrderedBy('createdAt'),
                plannedExercisesRepository.getIndexValues('plannedSessionId')
            ]);

            const exercisesCountBySessionId: Map<PlannedSession['id'], number> = new Map();

            for (const sessionId of exercisesSessionIds) {
                exercisesCountBySessionId.set(sessionId, (exercisesCountBySessionId.get(sessionId) ?? 0) + 1);
            }

            return plannedSessions.map((plannedSession) => ({
                ...plannedSession,
                exercisesCount: exercisesCountBySessionId.get(plannedSession.id) ?? 0
            }));
        });
    }

    /** One planned session with its exercises count. Fails with `NOT_FOUND` if it does not exist. */
    async function getPlannedSession(id: PlannedSession['id']): Promise<QueryResult<PlannedSessionSummary>> {
        return runQuery(async () => {
            const [plannedSession, exercisesCount] = await Promise.all([
                plannedSessionsRepository.getById(id),
                plannedExercisesRepository.countWhere('plannedSessionId', id)
            ]);

            if (!plannedSession) {
                throw new QueryException('NOT_FOUND', `Planned session ${id} not found.`);
            }

            return { ...plannedSession, exercisesCount };
        });
    }

    /** Number of planned sessions. */
    async function countPlannedSessions(): Promise<QueryResult<number>> {
        return runQuery(async () => plannedSessionsRepository.count());
    }

    return {
        getPlannedSessions,
        getPlannedSession,
        countPlannedSessions
    };
}
