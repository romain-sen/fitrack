import { Spinner } from "@/components/ui/Spinner";
import { YStack } from "@/components/ui/YStack";
import { useGoalsValue } from "@/modules/goal/states/goalsAtom";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import { useEffect, useState } from "react";
import { MURPH_WORKOUT_TEMPLATE } from "../../constants/murphWorkoutTemplate";
import { ExerciseTracking } from "./ExerciseTracking";
import { TransitionTracking } from "./TransitionTracking";
import { WorkoutSummaryTimeline } from "./WorkoutSummaryTimeline";

interface WorkoutTrackingProps {
  timeInSeconds: number;
  finishWorkout: () => void;
}

export const WorkoutTracking = ({
  timeInSeconds,
  finishWorkout,
}: WorkoutTrackingProps) => {
  const goals = useGoalsValue();

  const workoutStepsTemplate = MURPH_WORKOUT_TEMPLATE;
  const currentStep = useWorkoutStore.getState().currentStepIndex;
  const isWorkoutCompleted = useWorkoutStore.getState().isWorkoutCompleted;
  const workoutSteps = useWorkoutStore.getState().workoutSteps;

  const [showTransitionScreen, setShowTransitionScreen] = useState(false);

  useEffect(() => {
    useWorkoutStore.getState().initializeWorkout(workoutStepsTemplate, goals);
  }, []);

  useEffect(() => {
    if (isWorkoutCompleted) {
      console.log("Workout data", useWorkoutStore.getState().workoutSteps);
      finishWorkout();
    }
  }, [isWorkoutCompleted]);

  const markExerciseAsDone = () => {
    useWorkoutStore.getState().finalizeCurrentStep(timeInSeconds);
    setShowTransitionScreen(true);
  };

  const markTransitionAsDone = () => {
    setShowTransitionScreen(false);
    useWorkoutStore.getState().startNextStep(timeInSeconds);
  };

  if (!workoutSteps || workoutSteps.length === 0) {
    return <Spinner className="mt-xl" />;
  }

  return (
    <YStack className="bg-slate-200 flex-1">
      {showTransitionScreen ? (
        <TransitionTracking markAsDone={markTransitionAsDone} />
      ) : (
        <ExerciseTracking
          exercise={workoutSteps[currentStep]}
          markAsDone={markExerciseAsDone}
        />
      )}
      <WorkoutSummaryTimeline />
    </YStack>
  );
};
