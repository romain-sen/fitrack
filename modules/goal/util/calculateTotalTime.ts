import { ExerciseGoal } from "../types/ExerciseGoal";

interface ExerciseGoalCalculation extends ExerciseGoal {
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
        ? (exercise.taskAmount / exercise.goalValueInSeconds) * 60
        : exercise.taskAmount / exercise.goalValueInSeconds;

    totalTimeMin += exerciseTimeMin;

    // Add transition time
    totalTimeMin += exercise.transitionTimeSec / 60;
  }

  return totalTimeMin;
};
