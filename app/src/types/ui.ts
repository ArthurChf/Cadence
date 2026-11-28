import type { PlannedSession } from '#/types/program';

export type Size =
    '2xs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl';

export type IconName =
    'dumbbell'
    | 'calendar-days'
    | 'chart-column'
    | 'settings'
    | 'chevron-right'
    | 'plus'
    | 'x'
    | 'check'
    | 'chevron-left'
    | 'copy-check';

export type SessionToDuplicate = {
    id: PlannedSession['id'];
    name: PlannedSession['name'];
    exercisesCount: number;
};
