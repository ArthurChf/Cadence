export type MuscleKey =
    'ABDOMINALS'
    | 'BICEPS'
    | 'CALVES'
    | 'DELTOIDS'
    | 'PECTORALS'
    | 'QUADRICEPS'
    | 'TRAPEZIUS'
    | 'TRICEPS';

export type ExerciseKey =
    '';

export type CatalogExercise = {
    key: ExerciseKey;
    muscleKeys: MuscleKey[];
};
