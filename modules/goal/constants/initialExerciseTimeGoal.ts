import { Exercise } from "../types/Exercise";

export const INITIAL_EXERCISE_TIME_GOAL: Exercise[] = [
  {
    label: "Running 1",
    unit: "km/h",
    goalValue: 10,
    minValue: 5,
    adjustingStep: 0.5,
    taskAmount: 1.6,
  },
  {
    label: "Pull ups",
    unit: "rep/min",
    goalValue: 10,
    minValue: 1,
    adjustingStep: 1,
    taskAmount: 100,
  },
  {
    label: "Push ups",
    unit: "rep/min",
    goalValue: 20,
    minValue: 1,
    adjustingStep: 1,
    taskAmount: 200,
  },
  {
    label: "Squats",
    unit: "rep/min",
    goalValue: 30,
    minValue: 1,
    adjustingStep: 1,
    taskAmount: 300,
  },
  {
    label: "Running 2",
    unit: "km/h",
    goalValue: 8.5,
    minValue: 5,
    adjustingStep: 0.5,
    taskAmount: 1.6,
  },
];
