import { ExerciseGoal } from "../types/ExerciseGoal";

export const INITIAL_EXERCISE_TIME_GOAL: ExerciseGoal[] = [
  {
    label: "Running 1",
    unit: "km/h",
    goalValueInUnit: 10,
    minValueInUnit: 5,
    adjustingStep: 0.5,
    taskAmount: 1.6,
    goalValueInSeconds: 576,
  },
  {
    label: "Pull ups",
    unit: "rep/min",
    goalValueInUnit: 10,
    minValueInUnit: 1,
    adjustingStep: 1,
    taskAmount: 100,
    goalValueInSeconds: 600,
  },
  {
    label: "Push ups",
    unit: "rep/min",
    goalValueInUnit: 20,
    minValueInUnit: 1,
    adjustingStep: 1,
    taskAmount: 200,
    goalValueInSeconds: 600,
  },
  {
    label: "Squats",
    unit: "rep/min",
    goalValueInUnit: 30,
    minValueInUnit: 1,
    adjustingStep: 1,
    taskAmount: 300,
    goalValueInSeconds: 600,
  },
  {
    label: "Running 2",
    unit: "km/h",
    goalValueInUnit: 8.5,
    minValueInUnit: 5,
    adjustingStep: 0.5,
    taskAmount: 1.6,
    goalValueInSeconds: 576,
  },
];
