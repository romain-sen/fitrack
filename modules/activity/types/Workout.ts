import { Exercise } from "./Exercise";

export type Workout = {
  exercises: Exercise[];
  dateTimestamp: number;
  totalTime: number;
  totalTransitionTime: number;
};
