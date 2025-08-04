export type ExerciseDetails = {
  numberOfReps: number;
  endTimestamp: number;
};

export type Exercise = {
  name: string;
  unit: "km" | "rep";
  taskAmount: number;
  repetitionIncrement: number[];
  goalValueInSeconds: number | null;

  startTimestamp: number | null; // timestamp en ms (Date.now().getTime())
  endTimestamp: number | null;

  details: ExerciseDetails[];
};
