interface ExerciseInput {
  unit: "km/h" | "rep/min";
  value: number;
  taskAmount: number;
  transitionTimeSec: number;
}

export const calculateTotalGoalTime = (exercises: ExerciseInput[]): number => {
  let totalTimeMin = 0;

  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];

    const exerciseTimeMin =
      exercise.unit === "km/h"
        ? (exercise.taskAmount / exercise.value) * 60
        : exercise.taskAmount / exercise.value;

    totalTimeMin += exerciseTimeMin;

    // Add transition time
    totalTimeMin += exercise.transitionTimeSec / 60;
  }

  return totalTimeMin;
};
