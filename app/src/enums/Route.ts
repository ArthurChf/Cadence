export const Route = {
    TODAY: '/today'
} as const;

export type RouteType = typeof Route[keyof typeof Route];
