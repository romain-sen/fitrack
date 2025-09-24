import { addFreeWorkoutToStorage } from "@/utils/storage";
import { create } from "zustand";

export type FreeWorkoutExerciseDetails = {
  numberOfReps: number;
  endTimestamp: number;
};

export type FreeWorkoutExercise = {
  name: string;
  numberOfReps: number;
  startTimestamp: number | null;
  endTimestamp: number | null;
  details: FreeWorkoutExerciseDetails[];
};

export type FreeWorkout = {
  exercises: FreeWorkoutExercise[];
  dateTimestamp: number;
  totalTime: number;
};

type FreeWorkoutStore = {
  workoutSteps: FreeWorkoutExercise[];
  currentStepIndex: number;
  isWorkoutCompleted: boolean;
  actions: {
    initializeWorkout: () => void;

    updateCurrentExerciseName: (name: string) => void;

    addRepsToCurrentExercise: (detail: {
      numberOfReps: number;
      endTimestamp: number;
    }) => void;

    startNextExercise: (timestamp: number) => void;

    markWorkoutCompleted: () => void;
    resetWorkout: () => void;

    saveWorkoutToLocalStorage: () => void;
  };
};

const useFreeWorkoutStore = create<FreeWorkoutStore>((set, get) => ({
  workoutSteps: [],
  currentStepIndex: 0,
  isWorkoutCompleted: false,
  actions: {
    initializeWorkout: () => {
      set({
        workoutSteps: [],
        currentStepIndex: 0,
        isWorkoutCompleted: false,
      });
    },

    updateCurrentExerciseName: (name: string) => {
      const { workoutSteps, currentStepIndex } = get();
      const updatedSteps = [...workoutSteps];
      const current = updatedSteps[currentStepIndex];
      if (!current) return;

      current.name = name;
      set({ workoutSteps: updatedSteps });
    },

    addRepsToCurrentExercise: (detail) => {
      const { workoutSteps, currentStepIndex } = get();
      const updatedSteps = [...workoutSteps];
      const current = updatedSteps[currentStepIndex];
      if (!current) return;

      current.details = [...current.details, detail];
      set({ workoutSteps: updatedSteps });
    },

    /* Finish current exercise and start next exercise */
    startNextExercise: (timestamp) => {
      const { currentStepIndex, workoutSteps } = get();

      const nextIndex = currentStepIndex + 1;
      const updatedSteps = [...workoutSteps];
      updatedSteps.push({
        name: "",
        numberOfReps: 0,
        startTimestamp: timestamp,
        endTimestamp: null,
        details: [],
      });

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
      const { workoutSteps } = get();
      const firstTimestamp = workoutSteps[0]?.startTimestamp;
      const lastTimestamp = workoutSteps[workoutSteps.length - 1]?.endTimestamp;
      if (!firstTimestamp || !lastTimestamp) {
        throw new Error("First and last timestamps should be defined");
      }
      const totalTimeSeconds = Math.floor(
        (lastTimestamp - firstTimestamp) / 1000
      );

      const workout: FreeWorkout = {
        exercises: workoutSteps,
        dateTimestamp: new Date().getTime(),
        totalTime: totalTimeSeconds,
      };
      addFreeWorkoutToStorage(workout);
    },
  },
}));

export const useFreeWorkoutStoreActions = () => {
  const { actions } = useFreeWorkoutStore();
  return actions;
};

export const useFreeWorkoutSteps = () => {
  const { workoutSteps } = useFreeWorkoutStore();
  return workoutSteps;
};

export const useWorkoutCurrentStepIndex = () => {
  const { currentStepIndex } = useFreeWorkoutStore();
  return currentStepIndex;
};

export const useIsWorkoutCompleted = () => {
  const { isWorkoutCompleted } = useFreeWorkoutStore();
  return isWorkoutCompleted;
};

export const useCurrentExerciseName = () => {
  const { workoutSteps, currentStepIndex } = useFreeWorkoutStore();
  return workoutSteps[currentStepIndex]?.name;
};
