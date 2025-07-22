import { Exercise } from "@/modules/activity/types/Exercise";
import { ExerciseGoal } from "@/modules/goal/types/ExerciseGoal";
import { create } from "zustand";

type WorkoutStore = {
  workoutSteps: Exercise[];
  currentStepIndex: number;
  isWorkoutCompleted: boolean;

  initializeWorkout: (
    workoutStepsTemplate: Exercise[],
    goals: ExerciseGoal[]
  ) => void;

  addDetailToCurrentStep: (detail: {
    numberOfReps: number;
    timeUsedInSeconds: number;
  }) => void;

  startCurrentStep: (timestamp: number) => void;
  finalizeCurrentStep: (timestamp: number) => void;

  startNextStep: (timestamp: number) => void;

  markWorkoutCompleted: () => void;
  resetWorkout: () => void;
};

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workoutSteps: [],
  currentStepIndex: 0,
  isWorkoutCompleted: false,

  initializeWorkout: (workoutStepsTemplate, goals) => {
    const goalsInSeconds = goals.map((goal) => goal.goalValueInSeconds);

    const initialized = workoutStepsTemplate.map((step, index) => ({
      ...step,
      goalValueInSeconds: goalsInSeconds[index] ?? null,
      startTimestamp: null,
      endTimestamp: null,
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

  startCurrentStep: (timestamp) => {
    const { workoutSteps, currentStepIndex } = get();
    const updatedSteps = [...workoutSteps];
    const current = updatedSteps[currentStepIndex];
    if (!current) return;

    current.startTimestamp = timestamp;
    current.endTimestamp = null;
    current.details = [];

    set({ workoutSteps: updatedSteps });
  },

  finalizeCurrentStep: (timestamp) => {
    const { workoutSteps, currentStepIndex } = get();
    const updatedSteps = [...workoutSteps];
    const current = updatedSteps[currentStepIndex];
    if (!current) return;

    current.endTimestamp = timestamp;

    set({ workoutSteps: updatedSteps });
  },

  startNextStep: (timestamp) => {
    const { currentStepIndex, workoutSteps } = get();
    const isLastStep = currentStepIndex >= workoutSteps.length - 1;

    if (isLastStep) {
      get().markWorkoutCompleted();
      return;
    }

    const nextIndex = currentStepIndex + 1;
    const updatedSteps = [...workoutSteps];
    const nextStep = updatedSteps[nextIndex];

    if (nextStep) {
      nextStep.startTimestamp = timestamp;
      nextStep.endTimestamp = null;
      nextStep.details = [];
    }

    set({
      workoutSteps: updatedSteps,
      currentStepIndex: nextIndex,
    });
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
