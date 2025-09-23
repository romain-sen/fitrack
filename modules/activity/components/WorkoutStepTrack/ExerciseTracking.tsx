import { useChronometer } from "../../hooks/useChronometer";
import { Exercise } from "../../types/Exercise";
import { RepetitionExercise } from "./RepetitionExercise";
import { RunningExercise } from "./RunningExercise";

interface ExerciseTrackingProps {
  exercise: Exercise;
  markAsDone: () => void;
}

export const ExerciseTracking = ({
  exercise,
  markAsDone,
}: ExerciseTrackingProps) => {
  const { countdown, timeInSeconds } = useChronometer({
    countdownInSeconds: 0,
  });

  if (exercise.unit === "km") {
    return (
      <RunningExercise
        exercise={exercise}
        markAsDone={markAsDone}
        countdown={countdown}
        timeInSeconds={timeInSeconds}
      />
    );
  } else if (exercise.unit === "rep") {
    return <RepetitionExercise exercise={exercise} markAsDone={markAsDone} />;
  }
  return null;
};
