import type { QueryError, QueryResult } from '#/types/query';
import { toQueryError } from '#/utils/query';
import type { Subscription } from 'dexie';
import { liveQuery } from 'dexie';
import type { Ref, ShallowRef, WatchSource } from 'vue';
import { getCurrentScope, onScopeDispose, readonly, ref, shallowRef, watch } from 'vue';

export type LiveResult<T> = {
    /** Latest data. Kept while a new result is loading, when a query fails, and after `stop()`. */
    data: Readonly<ShallowRef<T>>;
    /** Error of the latest result, `null` when it succeeded. */
    error: Readonly<ShallowRef<QueryError | null>>;
    /** `true` while waiting for a result (first load, or after a (re)start). */
    isLoading: Readonly<Ref<boolean>>;
    /** First result, for awaiting the initial load back-end style. */
    ready: Promise<QueryResult<T>>;
};

export type LiveResultController<T> = LiveResult<T> & {
    /** Subscribes to the query (closes the current subscription first, if any). */
    start(): void;
    /** Closes the subscription. The latest data is kept. */
    stop(): void;
};

type Query<T> = () => Promise<QueryResult<T>>;

type LiveResultOptions = {
    /** Reactive sources the query depends on (e.g. a route param): the query is re-subscribed when they change. */
    watch?: WatchSource | WatchSource[];
};

/**
 * Keeps the result of a back-end style query (`{ data, error }`) in sync with the database,
 * with a manual lifecycle (`start`/`stop`). Not bound to a component: usable in a store.
 *
 * Performance:
 * - Dexie re-runs the query only when a write intersects the index ranges it read;
 * - results are stored in `shallowRef`s: no deep reactive proxies over the records.
 */
export function createLiveResult<T>(query: Query<T>, initialValue: T): LiveResultController<T>;
export function createLiveResult<T>(query: Query<T>): LiveResultController<T | undefined>;
export function createLiveResult<T>(query: Query<T>, initialValue?: T): LiveResultController<T | undefined> {
    const data = shallowRef(initialValue);
    const error = shallowRef<QueryError | null>(null);
    const isLoading = ref(true);

    let resolveReady: ((result: QueryResult<T>) => void) | null = null;
    const ready: Promise<QueryResult<T>> = new Promise((resolve) => {
        resolveReady = resolve;
    });

    let subscription: Subscription | null = null;

    function onResult(result: QueryResult<T>) {
        if (result.error) {
            error.value = result.error;
        } else {
            data.value = result.data;
            error.value = null;
        }

        isLoading.value = false;
        resolveReady?.(result);
        resolveReady = null;
    }

    function stop() {
        subscription?.unsubscribe();
        subscription = null;
    }

    function start() {
        stop();
        isLoading.value = true;

        subscription = liveQuery(query).subscribe({
            next: onResult,
            // `query` never throws (see `runQuery`): this only covers failures of the subscription itself
            error: (reason: unknown) => onResult({ data: null, error: toQueryError(reason) })
        });
    }

    return {
        data,
        error,
        isLoading: readonly(isLoading),
        ready,
        start,
        stop
    };
}

/**
 * Live result owned by the calling component (or effect scope): subscribed right away,
 * closed when the scope is disposed. For data shared across screens, prefer a store.
 */
export function useLiveResult<T>(query: Query<T>, options: LiveResultOptions & { initialValue: T }): LiveResult<T>;
export function useLiveResult<T>(query: Query<T>, options?: LiveResultOptions): LiveResult<T | undefined>;
export function useLiveResult<T>(query: Query<T>, options: LiveResultOptions & { initialValue?: T } = {}): LiveResult<T | undefined> {
    if (!getCurrentScope()) {
        throw new Error('useLiveResult() must be called inside a component setup or an effect scope.');
    }

    const { start, stop, ...liveResult } = createLiveResult(query, options.initialValue);

    if (options.watch) {
        watch(options.watch, start, { immediate: true });
    } else {
        start();
    }

    onScopeDispose(stop);

    return liveResult;
}
