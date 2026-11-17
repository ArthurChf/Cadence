export const Route = {
    TODAY: '/today',
    PROGRAM: '/program',
    PROGRESS: '/progress',
    SETTINGS: '/settings'
} as const;

export type RouteType = typeof Route[keyof typeof Route];
