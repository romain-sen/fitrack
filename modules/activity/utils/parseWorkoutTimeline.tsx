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
  const maxIndex = steps.length - 2;
  return steps.map((step, index) => {
    const isCurrent = index === currentStepIndex;

    const start = step.startTimestamp ?? 0;
    const end = step.endTimestamp ?? 0;
    const duration = Math.max(end - start, 0);

    let transition: number | undefined = undefined;

    if (index > maxIndex) {
      return {
        name: step.name,
        duration,
        transition,
        isCurrentExercise: isCurrent,
        isCurrentTransition: false,
      };
    }

    const nextStep = steps[index + 1];
    const currentStepIsDone = step.endTimestamp !== null;
    const nextStepHasStarted = nextStep.startTimestamp !== null;
    // It's a transition if the current exercise is done but the next one hasn't started yet
    const isCurrentTransition = currentStepIsDone && !nextStepHasStarted;

    // currentStepIsDone && nextStepHasStarted
    if (step.endTimestamp !== null && nextStep.startTimestamp !== null) {
      transition = Math.max(nextStep.startTimestamp - step.endTimestamp, 0);
    }

    return {
      name: step.name,
      duration,
      transition,
      isCurrentExercise: isCurrent,
      isCurrentTransition: isCurrentTransition,
    };
  });
};
