// stores/useWorkoutStore.ts
import { Workout } from "@/modules/activity/types/Workout";
import { create } from "zustand";

type WorkoutStore = {
  workoutSteps: Workout[];
  currentStepIndex: number;
  isWorkoutCompleted: boolean;
  initializeWorkout: (
    workoutStepsTemplate: Workout[],
    goals: (number | null)[]
  ) => void;
  addDetailToCurrentStep: (detail: {
    numberOfReps: number;
    timeUsedInSeconds: number;
  }) => void;
  finalizeCurrentStep: (timeInSeconds?: number) => void;
  goToNextStep: () => void;
  markWorkoutCompleted: () => void;
  resetWorkout: () => void;
};

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workoutSteps: [],
  currentStepIndex: 0,
  isWorkoutCompleted: false,

  initializeWorkout: (workoutStepsTemplate, goals) => {
    const initialized = workoutStepsTemplate.map((step, index) => ({
      ...step,
      goalValueInSeconds: goals[index] ?? null,
      timeUsedInSeconds: null,
      details: [],
    }));

    set({
      workoutSteps: initialized,
      currentStepIndex: 0,
      isWorkoutCompleted: false,
    });
  },

  addDetailToCurrentStep: (detail) => {
    const { workoutSteps, currentStepIndex } = get();
    const updatedSteps = [...workoutSteps];
    const current = updatedSteps[currentStepIndex];
    if (!current) return;

    current.details = [...current.details, detail];
    set({ workoutSteps: updatedSteps });
  },

  finalizeCurrentStep: (timeInSeconds?: number) => {
    const { workoutSteps, currentStepIndex } = get();
    const updatedSteps = [...workoutSteps];
    const current = updatedSteps[currentStepIndex];
    if (!current) return;

    if (typeof timeInSeconds === "number") {
      current.timeUsedInSeconds = timeInSeconds;
    } else {
      const totalTime = current.details.reduce(
        (sum, detail) => sum + detail.timeUsedInSeconds,
        0
      );
      current.timeUsedInSeconds = totalTime;
    }

    set({ workoutSteps: updatedSteps });
  },

  goToNextStep: () => {
    const { currentStepIndex, workoutSteps } = get();
    const isLastStep = currentStepIndex >= workoutSteps.length - 1;

    if (!isLastStep) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      get().markWorkoutCompleted();
    }
  },

  markWorkoutCompleted: () => {
    set({ isWorkoutCompleted: true });
  },

  resetWorkout: () => {
    set({
      workoutSteps: [],
      currentStepIndex: 0,
      isWorkoutCompleted: false,
    });
  },
}));
