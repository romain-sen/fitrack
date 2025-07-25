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
    countdownInSeconds: exercise.goalValueInSeconds ?? 0,
    speedFactor: 10,
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
  }

  return (
    <RepetitionExercise
      exercise={exercise}
      markAsDone={markAsDone}
      countdown={countdown}
      timeInSeconds={timeInSeconds}
    />
  );
};
