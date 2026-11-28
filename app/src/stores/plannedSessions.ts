import { createLiveResult } from '#/composables/useLiveResult';
import { usePlannedSessions } from '#/composables/usePlannedSessions';
import type { PlannedSessionSummary } from '#/composables/usePlannedSessions';
import type { QueryResult } from '#/types/query';
import { defineStore, storeToRefs } from 'pinia';
import { computed, getCurrentScope, onScopeDispose } from 'vue';

/**
 * Live list of the planned sessions, shared by every screen.
 *
 * - One Dexie subscription, whatever the number of consumers (ref-counted):
 *   opened by the first consumer, closed when the last one is disposed.
 * - The list is cached between screens: a remounting screen renders it instantly
 *   while the subscription restarts.
 *
 * Components use `useLivePlannedSessions()` rather than this store directly.
 */
export const usePlannedSessionsStore = defineStore('plannedSessions', () => {
    const { getPlannedSessions } = usePlannedSessions();
    const liveResult = createLiveResult(getPlannedSessions, []);

    let consumersCount = 0;

    // Exposed as getters: read-only for the consumers
    const plannedSessions = computed(() => liveResult.data.value);
    const error = computed(() => liveResult.error.value);
    const isLoading = computed(() => liveResult.isLoading.value);

    function subscribe() {
        consumersCount++;

        if (consumersCount === 1) {
            liveResult.start();
        }
    }

    function unsubscribe() {
        consumersCount = Math.max(0, consumersCount - 1);

        if (consumersCount === 0) {
            liveResult.stop();
        }
    }

    /** First result, for awaiting the initial load back-end style. */
    async function whenReady(): Promise<QueryResult<PlannedSessionSummary[]>> {
        return liveResult.ready;
    }

    return {
        plannedSessions,
        error,
        isLoading,
        subscribe,
        unsubscribe,
        whenReady
    };
});

/**
 * Planned sessions ordered by creation date, each with its exercises count,
 * kept in sync with the database for as long as the calling component is mounted.
 */
export function useLivePlannedSessions() {
    if (!getCurrentScope()) {
        throw new Error('useLivePlannedSessions() must be called inside a component setup or an effect scope.');
    }

    const store = usePlannedSessionsStore();

    store.subscribe();
    onScopeDispose(store.unsubscribe);

    const { plannedSessions, error, isLoading } = storeToRefs(store);

    return {
        plannedSessions,
        error,
        isLoading,
        whenReady: store.whenReady
    };
}
