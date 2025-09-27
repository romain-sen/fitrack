import { Exercise } from "@/modules/activity/types/Exercise";
import { FreeWorkoutExercise } from "@/stores/useFreeWorkoutStore";

export const calculateTotalTransitionTime = (
  workoutSteps: Exercise[] | FreeWorkoutExercise[]
) => {
  let totalTransitionTime = 0;
  for (let i = 0; i < workoutSteps.length - 2; i++) {
    const nextStepStartTimestamp = workoutSteps[i + 1]?.startTimestamp;
    const currentStepEndTimestamp = workoutSteps[i]?.endTimestamp;

    if (!nextStepStartTimestamp || !currentStepEndTimestamp) {
      console.log("skipping transition time calculation");
      continue;
    }

    const transitionTime = nextStepStartTimestamp - currentStepEndTimestamp;
    totalTransitionTime += transitionTime;
  }
  return totalTransitionTime;
};
