export type Exercise = {
  label: string;
  unit: "km/h" | "rep/min";
  value: number;
  minValue: number;
  step: number;
  taskAmount: number; // en km ou nombre de reps
};
