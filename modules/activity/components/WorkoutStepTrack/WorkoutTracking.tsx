import { XStack } from "@/components/ui/XStack";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { MURPH_WORKOUT_TEMPLATE } from "../../constants/murphWorkoutTemplate";

interface WorkoutTrackingProps {
  timeInSeconds: number;
  finishWorkout: () => void;
}

export const WorkoutTracking = ({
  timeInSeconds,
  finishWorkout,
}: WorkoutTrackingProps) => {
  const workoutStepsTemplate = MURPH_WORKOUT_TEMPLATE;
  const goals = [600, 300, 500, 600, 700];
  const currentStep = useWorkoutStore.getState().currentStepIndex;
  const isWorkoutCompleted = useWorkoutStore.getState().isWorkoutCompleted;
  const workoutSteps = useWorkoutStore.getState().workoutSteps;

  useEffect(() => {
    useWorkoutStore.getState().initializeWorkout(workoutStepsTemplate, goals);
  }, []);

  useEffect(() => {
    if (isWorkoutCompleted) {
      console.log("Workout data", useWorkoutStore.getState().workoutSteps);
      finishWorkout();
    }
  }, [isWorkoutCompleted]);

  return (
    <View className="w-1/2 mx-auto mt-xl">
      {workoutSteps.map((step, index) => (
        <XStack
          key={step.name}
          className={`justify-between ${
            index === currentStep ? "bg-accent" : ""
          }`}
        >
          <Text>{step.name}</Text>
          <Text>{step.timeUsedInSeconds ?? "0"}</Text>
        </XStack>
      ))}
      {isWorkoutCompleted && (
        <Text className="text-center text-accent">Workout completed</Text>
      )}
      <Button
        title="Next Step"
        onPress={() => {
          useWorkoutStore.getState().finalizeCurrentStep(timeInSeconds);
          useWorkoutStore.getState().goToNextStep();
        }}
      />
    </View>
  );
};
