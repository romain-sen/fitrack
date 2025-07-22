export type ExerciseGoal = {
  label: string;
  unit: "km/h" | "rep/min";
  goalValueInUnit: number; // Value we want to achieve, in unit of exercise
  minValueInUnit: number;
  goalValueInSeconds: number; // Value we want to achieve in seconds
  adjustingStep: number; // Number we increment when setting the goal
  taskAmount: number; // Number of reps or km to complete the exercise
};
