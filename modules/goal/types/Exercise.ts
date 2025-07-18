export type Exercise = {
  label: string;
  unit: "km/h" | "rep/min";
  goalValue: number; // Value we want to achieve
  minValue: number;
  adjustingStep: number; // Number we increment when setting the goal
  taskAmount: number; // Number of reps or km to complete the exercise
};
