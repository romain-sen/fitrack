import { ExerciseGoal } from "../types/ExerciseGoal";

export interface ExerciseGoalCalculation extends ExerciseGoal {
  transitionTimeSec: number;
}

export const calculateTotalGoalTime = (
  exercises: ExerciseGoalCalculation[]
): number => {
  let totalTimeMin = 0;

  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];

    const exerciseTimeMin =
      exercise.unit === "km/h"
        ? (exercise.taskAmount / exercise.goalValueInUnit) * 60
        : exercise.taskAmount / exercise.goalValueInUnit;

    totalTimeMin += exerciseTimeMin;

    // Add transition time
    totalTimeMin += exercise.transitionTimeSec / 60;
  }

  return totalTimeMin;
};

export const calculateExerciseTimeInSeconds = (exercise: ExerciseGoal) => {
  if (exercise.unit === "km/h") {
    return (exercise.taskAmount / exercise.goalValueInUnit) * 3600;
  }

  if (exercise.unit === "rep/min") {
    return (exercise.taskAmount / exercise.goalValueInUnit) * 60;
  }

  throw new Error("Invalid unit");
};
