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

const defaultValuesOfFreeWorkoutExercise = (timestamp: number) => ({
  name: "",
  numberOfReps: 0,
  startTimestamp: timestamp,
  endTimestamp: null,
  details: [],
});

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

    startNextExercise: () => void;

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
        workoutSteps: [
          defaultValuesOfFreeWorkoutExercise(new Date().getTime()),
        ],
        currentStepIndex: 0,
        isWorkoutCompleted: false,
      });
    },

    updateCurrentExerciseName: (name: string) => {
      const { workoutSteps, currentStepIndex } = get();
      const updatedSteps = [...workoutSteps];
      const current = updatedSteps[currentStepIndex];
      if (!current) return;

      const newWorkoutSteps = updatedSteps.map((step, index) =>
        index === currentStepIndex ? { ...step, name: name } : step
      );
      set({ workoutSteps: newWorkoutSteps });
    },

    addRepsToCurrentExercise: (detail) => {
      const { workoutSteps, currentStepIndex } = get();
      const updatedSteps = [...workoutSteps];
      const current = updatedSteps[currentStepIndex];
      if (!current) return;

      const newDetails = [...current.details, detail];
      const newWorkoutSteps = updatedSteps.map((step, index) =>
        index === currentStepIndex ? { ...step, details: newDetails } : step
      );
      set({
        workoutSteps: newWorkoutSteps,
      });
    },

    /* Finish current exercise and start next exercise */
    startNextExercise: () => {
      const { currentStepIndex, workoutSteps } = get();

      const nextIndex = currentStepIndex + 1;
      const updatedSteps = [...workoutSteps];

      // Finish current exercise by setting the endTimestamp to the current timestamp
      updatedSteps[currentStepIndex].endTimestamp = new Date().getTime();

      // If the name of the exercise is empty, set it to the name of the current exercise
      if (updatedSteps[currentStepIndex].name === "") {
        updatedSteps[currentStepIndex].name =
          `Exercise ${currentStepIndex + 1}`;
      }

      // Start next exercise by adding a new exercise with the current timestamp
      updatedSteps.push(
        defaultValuesOfFreeWorkoutExercise(new Date().getTime())
      );

      set({
        workoutSteps: updatedSteps,
        currentStepIndex: nextIndex,
      });
    },

    markWorkoutCompleted: () => {
      const { workoutSteps, currentStepIndex } = get();

      // Finish current exercise by setting the endTimestamp to the current timestamp
      const updatedSteps = [...workoutSteps];
      updatedSteps[currentStepIndex].endTimestamp = new Date().getTime();

      // If the name of the exercise is empty, set it to the name of the current exercise
      if (updatedSteps[currentStepIndex].name === "") {
        updatedSteps[currentStepIndex].name =
          `Exercise ${currentStepIndex + 1}`;
      }

      set({ workoutSteps: updatedSteps, isWorkoutCompleted: true });
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
        throw new Error(
          "[useFreeWorkoutStore] - [saveWorkoutToLocalStorage] First and last timestamps should be defined"
        );
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

export const useCurrentExerciseIndex = () => {
  const { currentStepIndex } = useFreeWorkoutStore();
  return currentStepIndex;
};
