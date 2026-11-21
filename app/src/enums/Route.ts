export const Route = {
    TODAY: '/today',
    PROGRAM: '/program',
    PROGRESS: '/progress',
    SETTINGS: '/settings',
    /** Development only */
    TEST: '/test'
} as const;

export type RouteType = typeof Route[keyof typeof Route];
