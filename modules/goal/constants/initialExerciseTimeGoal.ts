import { ExerciseGoal } from "../types/ExerciseGoal";

export const INITIAL_EXERCISE_TIME_GOAL: ExerciseGoal[] = [
  {
    label: "Running 1",
    unit: "km/h",
    goalValueInSeconds: 10,
    minValueInSeconds: 5,
    adjustingStep: 0.5,
    taskAmount: 1.6,
  },
  {
    label: "Pull ups",
    unit: "rep/min",
    goalValueInSeconds: 10,
    minValueInSeconds: 1,
    adjustingStep: 1,
    taskAmount: 100,
  },
  {
    label: "Push ups",
    unit: "rep/min",
    goalValueInSeconds: 20,
    minValueInSeconds: 1,
    adjustingStep: 1,
    taskAmount: 200,
  },
  {
    label: "Squats",
    unit: "rep/min",
    goalValueInSeconds: 30,
    minValueInSeconds: 1,
    adjustingStep: 1,
    taskAmount: 300,
  },
  {
    label: "Running 2",
    unit: "km/h",
    goalValueInSeconds: 8.5,
    minValueInSeconds: 5,
    adjustingStep: 0.5,
    taskAmount: 1.6,
  },
];
