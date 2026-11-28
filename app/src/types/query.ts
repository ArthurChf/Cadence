export type QueryErrorCode =
    | 'NOT_FOUND'
    | 'CONSTRAINT'
    | 'QUOTA_EXCEEDED'
    | 'UNKNOWN';

export type QueryError = {
    code: QueryErrorCode;
    message: string;
    /** Original error, for logging/debugging. */
    cause: unknown;
};

/**
 * Outcome of a query: either `data` or `error`, never both.
 * Narrow it by checking `error` before reading `data`.
 */
export type QueryResult<T> =
    | { data: T; error: null }
    | { data: null; error: QueryError };
