export type ExerciseGoal = {
  label: string;
  unit: "km/h" | "rep/min";
  goalValueInSeconds: number; // Value we want to achieve
  minValueInSeconds: number;
  adjustingStep: number; // Number we increment when setting the goal
  taskAmount: number; // Number of reps or km to complete the exercise
};
