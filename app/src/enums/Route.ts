export const Route = {
    TODAY: '/today',
    PROGRAM: '/program',
    PROGRAM_CREATE_PLANNED_SESSION: '/program/create-session',
    PROGRESS: '/progress',
    SETTINGS: '/settings'
} as const;

export type RouteType = typeof Route[keyof typeof Route];
