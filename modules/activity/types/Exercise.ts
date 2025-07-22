export type Exercise = {
  name: string;
  unit: "km" | "rep";
  taskAmount: number; // Number of reps or km to complete the exercise
  goalValueInSeconds: number | null; // Time we want to achieve
  timeUsedInSeconds: number | null; // Time used to complete the exercise
  details: ExerciseDetails[];
};

type ExerciseDetails = {
  numberOfReps: number;
  timeUsedInSeconds: number;
};
