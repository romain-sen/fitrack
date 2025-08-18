import { Exercise } from "@/modules/activity/types/Exercise";
import { Workout } from "@/modules/activity/types/Workout";
import { ExerciseGoal } from "@/modules/goal/types/ExerciseGoal";
import { calculateTotalTransitionTime } from "@/modules/workoutResult/utils/calculateTotalTransitionTime";
import { addWorkoutToStorage } from "@/utils/storage";
import { create } from "zustand";

type WorkoutStore = {
  workoutSteps: Exercise[];
  currentStepIndex: number;
  isWorkoutCompleted: boolean;
  addedWeightInKg: number;
  actions: {
    /**
     * Initialize the workout with the given template and goals
     * Set the startTimestamp of the first step to the current timestamp
     * @param workoutStepsTemplate - The template of the workout
     * @param goals - The goals of the workout
     * @param addedWeightInKg - The weight added for the workout in kg
     */
    initializeWorkout: (
      workoutStepsTemplate: Exercise[],
      goals: ExerciseGoal[],
      addedWeightInKg: number
    ) => void;

    addDetailToCurrentStep: (detail: {
      numberOfReps: number;
      endTimestamp: number;
    }) => void;

    finalizeCurrentStep: (timestamp: number) => void;

    startNextStep: (timestamp: number) => void;

    markWorkoutCompleted: () => void;
    resetWorkout: () => void;

    saveWorkoutToLocalStorage: () => void;
  };
};

const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workoutSteps: [],
  currentStepIndex: 0,
  isWorkoutCompleted: false,
  addedWeightInKg: 0,
  actions: {
    initializeWorkout: (workoutStepsTemplate, goals, addedWeightInKg) => {
      const goalsInSeconds = goals.map((goal) => goal.goalValueInSeconds);
      const now = new Date().getTime();

      const initialized = workoutStepsTemplate.map((step, index) => ({
        ...step,
        goalValueInSeconds: goalsInSeconds[index] ?? null,
        startTimestamp: index === 0 ? now : null,
        endTimestamp: null,
        details: [],
      }));

      set({
        workoutSteps: initialized,
        currentStepIndex: 0,
        isWorkoutCompleted: false,
        addedWeightInKg: addedWeightInKg,
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
        get().actions.markWorkoutCompleted();
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

    saveWorkoutToLocalStorage: () => {
      const { workoutSteps, addedWeightInKg } = get();
      const firstTimestamp = workoutSteps[0]?.startTimestamp;
      const lastTimestamp = workoutSteps[workoutSteps.length - 1]?.endTimestamp;
      if (!firstTimestamp || !lastTimestamp) {
        throw new Error("First and last timestamps should be defined");
      }
      const totalTimeSeconds = Math.floor(
        (lastTimestamp - firstTimestamp) / 1000
      );
      const totalTransitionTime = calculateTotalTransitionTime(workoutSteps);

      const workout: Workout = {
        exercises: workoutSteps,
        dateTimestamp: new Date().getTime(),
        totalTime: totalTimeSeconds,
        totalTransitionTime: totalTransitionTime,
        addedWeightInKg: addedWeightInKg,
      };
      addWorkoutToStorage(workout);
    },
  },
}));

export const useWorkoutStoreActions = () => {
  const { actions } = useWorkoutStore();
  return actions;
};

export const useWorkoutSteps = () => {
  const { workoutSteps } = useWorkoutStore();
  return workoutSteps;
};

export const useWorkoutCurrentStepIndex = () => {
  const { currentStepIndex } = useWorkoutStore();
  return currentStepIndex;
};

export const useIsWorkoutCompleted = () => {
  const { isWorkoutCompleted } = useWorkoutStore();
  return isWorkoutCompleted;
};

export const useAddedWeight = () => {
  const { addedWeightInKg } = useWorkoutStore();
  return addedWeightInKg;
};
