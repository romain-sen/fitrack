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
  finishWorkout: () => void;
}

export const WorkoutTracking = ({ finishWorkout }: WorkoutTrackingProps) => {
  const goals = useGoalsValue();

  const workoutStepsTemplate = MURPH_WORKOUT_TEMPLATE;
  const currentStep = useWorkoutStore.getState().currentStepIndex;
  const isWorkoutCompleted = useWorkoutStore.getState().isWorkoutCompleted;
  const workoutSteps = useWorkoutStore.getState().workoutSteps;

  const [showTransitionScreen, setShowTransitionScreen] = useState(false);

  const nowTimestamp = new Date().getTime();

  useEffect(() => {
    useWorkoutStore.getState().initializeWorkout(workoutStepsTemplate, goals);
  }, []);

  useEffect(() => {
    if (isWorkoutCompleted) {
      finishWorkout();
    }
  }, [isWorkoutCompleted]);

  const markExerciseAsDone = () => {
    useWorkoutStore.getState().finalizeCurrentStep(nowTimestamp);

    // If did all steps, don't show transition screen and finish workout here
    if (currentStep === workoutSteps.length - 1) {
      useWorkoutStore.getState().markWorkoutCompleted();
      return;
    }

    setShowTransitionScreen(true);
  };

  const markTransitionAsDone = () => {
    setShowTransitionScreen(false);
    useWorkoutStore.getState().startNextStep(nowTimestamp);
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
