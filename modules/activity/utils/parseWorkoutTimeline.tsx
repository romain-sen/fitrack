import { Exercise } from "@/modules/activity/types/Exercise";

export interface ParsedStep {
  name: string;
  duration: number;
  transition?: number;
  isCurrentExercise: boolean;
  isCurrentTransition: boolean;
}

export const parseWorkoutTimeline = (
  steps: Exercise[],
  currentStepIndex: number
): ParsedStep[] => {
  return steps.map((step, index) => {
    const isCurrent = index === currentStepIndex;
    const currentStep = steps[currentStepIndex];
    const nextStep = steps[currentStepIndex + 1];

    const startTimestamp = step.startTimestamp ?? 0;
    const endTimestamp = step.endTimestamp ?? 0;
    const duration = Math.max(endTimestamp - startTimestamp, 0);

    const currentEnd = currentStep.endTimestamp ?? 0;
    const nextStart = nextStep?.startTimestamp ?? null;

    const isCurrentStepTransition =
      currentStep.endTimestamp !== null && !nextStep?.startTimestamp;

    const transition =
      index < steps.length - 1 &&
      step.endTimestamp !== null &&
      steps[index + 1]?.startTimestamp !== null
        ? Math.max(
            (steps[index + 1].startTimestamp ?? 0) - (step.endTimestamp ?? 0),
            0
          )
        : undefined;

    return {
      name: step.name,
      duration,
      transition,
      isCurrentExercise: isCurrent && !isCurrentStepTransition,
      isCurrentTransition: isCurrent && isCurrentStepTransition,
    };
  });
};
