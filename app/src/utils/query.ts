import type { QueryError, QueryErrorCode, QueryResult } from '#/types/query';
import { Dexie } from 'dexie';

const errorCodeByDexieName: Partial<Record<string, QueryErrorCode>> = {
    [Dexie.errnames.NotFound]: 'NOT_FOUND',
    [Dexie.errnames.Constraint]: 'CONSTRAINT',
    [Dexie.errnames.QuotaExceeded]: 'QUOTA_EXCEEDED'
};

export class QueryException extends Error {
    readonly code: QueryErrorCode;

    constructor(code: QueryErrorCode, message: string) {
        super(message);
        this.name = 'QueryException';
        this.code = code;
    }
}

export function toQueryError(error: unknown): QueryError {
    if (error instanceof QueryException) {
        return { code: error.code, message: error.message, cause: error };
    }

    if (error instanceof Dexie.DexieError) {
        return { code: errorCodeByDexieName[error.name] ?? 'UNKNOWN', message: error.message, cause: error };
    }

    const message = error instanceof Error ? error.message : String(error);

    return { code: 'UNKNOWN', message, cause: error };
}

/**
 * Runs a query and returns its outcome instead of throwing,
 * like a response from a back-end: `{ data, error: null }` or `{ data: null, error }`.
 */
export async function runQuery<T>(query: () => Promise<T>): Promise<QueryResult<T>> {
    try {
        return { data: await query(), error: null };
    } catch (error) {
        return { data: null, error: toQueryError(error) };
    }
}
