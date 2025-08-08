import { Spinner } from "@/components/ui/Spinner";
import { YStack } from "@/components/ui/YStack";
import { useGoalsValue } from "@/modules/goal/states/goalsAtom";
import {
  useIsWorkoutCompleted,
  useWorkoutCurrentStepIndex,
  useWorkoutSteps,
  useWorkoutStoreActions,
} from "@/stores/useWorkoutStore";
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
  const {
    initializeWorkout,
    finalizeCurrentStep,
    markWorkoutCompleted,
    startNextStep,
  } = useWorkoutStoreActions();
  const currentStep = useWorkoutCurrentStepIndex();
  const workoutSteps = useWorkoutSteps();
  const isWorkoutCompleted = useIsWorkoutCompleted();

  const workoutStepsTemplate = MURPH_WORKOUT_TEMPLATE;

  const [showTransitionScreen, setShowTransitionScreen] = useState(false);

  const nowTimestamp = new Date().getTime();

  useEffect(() => {
    initializeWorkout(workoutStepsTemplate, goals);
  }, [goals, initializeWorkout, workoutStepsTemplate]);

  useEffect(() => {
    if (isWorkoutCompleted) {
      finishWorkout();
    }
  }, [isWorkoutCompleted]);

  const markExerciseAsDone = () => {
    finalizeCurrentStep(nowTimestamp);

    // If did all steps, don't show transition screen and finish workout here
    if (currentStep === workoutSteps.length - 1) {
      markWorkoutCompleted();
      return;
    }

    setShowTransitionScreen(true);
  };

  const markTransitionAsDone = () => {
    setShowTransitionScreen(false);
    startNextStep(nowTimestamp);
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
