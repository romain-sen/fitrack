import { Workout } from "@/modules/activity/types/Workout";
import { MMKV } from "react-native-mmkv";

export const secureStorage = new MMKV({
  id: `fitrack-secure-storage`,
  //TODO: create a new key for production
  encryptionKey: "fitrack-secure-storage-key",
});

export const addWorkoutToStorage = (workout: Workout) => {
  const workouts = secureStorage.getString("workouts");
  if (!workouts) {
    secureStorage.set("workouts", JSON.stringify([workout]));
  } else {
    secureStorage.set(
      "workouts",
      JSON.stringify([...JSON.parse(workouts), workout])
    );
  }
};

export const getWorkoutsFromStorage = () => {
  const workouts = secureStorage.getString("workouts");
  if (!workouts) {
    return [];
  }
  return JSON.parse(workouts);
};

export const deleteWorkoutFromStorage = (dateTimestamp: number) => {
  const workouts = secureStorage.getString("workouts");
  if (!workouts) {
    return;
  }
  const parsedWorkouts = JSON.parse(workouts);
  const filteredWorkouts = parsedWorkouts.filter(
    (workout: Workout) => workout.dateTimestamp !== dateTimestamp
  );
  secureStorage.set("workouts", JSON.stringify(filteredWorkouts));
};
