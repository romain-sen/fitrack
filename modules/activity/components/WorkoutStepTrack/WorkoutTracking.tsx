import { Spinner } from "@/components/ui/Spinner";
import { XStack } from "@/components/ui/XStack";
import { YStack } from "@/components/ui/YStack";
import { useGoalsValue } from "@/modules/goal/states/goalsAtom";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MURPH_WORKOUT_TEMPLATE } from "../../constants/murphWorkoutTemplate";
import { ExerciseTracking } from "./ExerciseTracking";
import { TransitionTracking } from "./TransitionTracking";

interface WorkoutTrackingProps {
  timeInSeconds: number;
  finishWorkout: () => void;
}

export const WorkoutTracking = ({
  timeInSeconds,
  finishWorkout,
}: WorkoutTrackingProps) => {
  const goals = useGoalsValue();

  const workoutStepsTemplate = MURPH_WORKOUT_TEMPLATE;
  const currentStep = useWorkoutStore.getState().currentStepIndex;
  const isWorkoutCompleted = useWorkoutStore.getState().isWorkoutCompleted;
  const workoutSteps = useWorkoutStore.getState().workoutSteps;

  const [showTransitionScreen, setShowTransitionScreen] = useState(false);

  useEffect(() => {
    useWorkoutStore.getState().initializeWorkout(workoutStepsTemplate, goals);
  }, []);

  useEffect(() => {
    if (isWorkoutCompleted) {
      console.log("Workout data", useWorkoutStore.getState().workoutSteps);
      finishWorkout();
    }
  }, [isWorkoutCompleted]);

  const markExerciseAsDone = () => {
    useWorkoutStore.getState().finalizeCurrentStep(timeInSeconds);
    setShowTransitionScreen(true);
  };

  const markTransitionAsDone = () => {
    setShowTransitionScreen(false);
    useWorkoutStore.getState().startNextStep(timeInSeconds);
  };

  if (!workoutSteps || workoutSteps.length === 0) {
    return <Spinner className="mt-xl" />;
  }

  return (
    <YStack className="gap-5xl">
      {showTransitionScreen ? (
        <TransitionTracking markAsDone={markTransitionAsDone} />
      ) : (
        <ExerciseTracking
          exercise={workoutSteps[currentStep]}
          markAsDone={markExerciseAsDone}
        />
      )}
      <View className="w-1/2 mx-auto mt-xl ">
        {workoutSteps.map((step, index) => (
          <XStack
            key={step.name}
            className={`justify-between ${
              index === currentStep ? "bg-accent" : ""
            }`}
          >
            <Text>{step.name}</Text>
            <Text>{step.endTimestamp ?? "0"}</Text>
          </XStack>
        ))}
      </View>
      {isWorkoutCompleted && (
        <Text className="text-center text-accent">Workout completed</Text>
      )}
    </YStack>
  );
};
