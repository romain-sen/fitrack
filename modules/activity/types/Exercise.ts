export type ExerciseDetails = {
  numberOfReps: number;
  timeUsedInSeconds: number;
};

export type Exercise = {
  name: string;
  unit: "km" | "rep";
  taskAmount: number;
  goalValueInSeconds: number | null;

  startTimestamp: number | null; // timestamp en ms (Date.now())
  endTimestamp: number | null;

  details: ExerciseDetails[];
};
