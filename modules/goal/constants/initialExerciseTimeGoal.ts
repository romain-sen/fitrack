import { Exercise } from "../types/Exercise";

export const INITIAL_EXERCISE_TIME_GOAL: Exercise[] = [
  {
    label: "Running 1",
    unit: "km/h",
    value: 10,
    minValue: 5,
    step: 0.5,
    taskAmount: 1.6,
  },
  {
    label: "Pull ups",
    unit: "rep/min",
    value: 10,
    minValue: 1,
    step: 1,
    taskAmount: 100,
  },
  {
    label: "Push ups",
    unit: "rep/min",
    value: 20,
    minValue: 1,
    step: 1,
    taskAmount: 200,
  },
  {
    label: "Squats",
    unit: "rep/min",
    value: 30,
    minValue: 1,
    step: 1,
    taskAmount: 300,
  },
  {
    label: "Running 2",
    unit: "km/h",
    value: 8.5,
    minValue: 5,
    step: 0.5,
    taskAmount: 1.6,
  },
];
