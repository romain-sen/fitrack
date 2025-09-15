import { CTAButton } from "@/components/ui/CTAButton";
import { MonoText } from "@/components/ui/MonoText";
import { XStack } from "@/components/ui/XStack";
import { YStack } from "@/components/ui/YStack";
import { useWorkoutStoreActions } from "@/stores/useWorkoutStore";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useChronometer } from "../../hooks/useChronometer";
import { Exercise } from "../../types/Exercise";

const NUMBER_OF_STEPS = 10;

interface RepetitionExerciseProps {
  exercise: Exercise;
  markAsDone: () => void;
}

export const RepetitionExercise = ({
  exercise,
  markAsDone,
}: RepetitionExerciseProps) => {
  const [repetitionsDone, setRepetitionsDone] = useState(0);
  const totalRepetitionsGoal = exercise.taskAmount;
  const goalValueInSeconds = exercise.goalValueInSeconds;
  const { addDetailToCurrentStep } = useWorkoutStoreActions();

  // If stepProgress is 0.1, it means we have done 10% of the total repetitions goal
  // If stepProgress is 0.14 we are between step 1 and 2, but we don't highlight step 2
  // Need to round the stepProgress to the step before
  const stepProgress = repetitionsDone / totalRepetitionsGoal;
  const currentStep = Math.floor(stepProgress * NUMBER_OF_STEPS);

  if (!goalValueInSeconds) {
    throw new Error("Goal value in seconds and start timestamp are required");
  }

  const timePerStep = goalValueInSeconds / NUMBER_OF_STEPS;

  const handleRepetitionDone = (numberOfRepetitions: number) => {
    setRepetitionsDone(repetitionsDone + numberOfRepetitions);
    // Add details to the exercise
    addDetailToCurrentStep({
      numberOfReps: numberOfRepetitions,
      endTimestamp: new Date().getTime(),
    });
    resetTimeOnly();
  };

  useEffect(() => {
    if (repetitionsDone >= totalRepetitionsGoal) {
      markAsDone();
    }
  }, [repetitionsDone, totalRepetitionsGoal, markAsDone]);

  const { timeInSeconds, resetTimeOnly } = useChronometer({
    countdownInSeconds: 0,
  });

  return (
    <View className="py-5xl px-lg flex-1 items-center bg-background">
      <Text className="text-text text-4xl font-semibold ">{exercise.name}</Text>
      <YStack className="w-full mt-xl flex-1 justify-center gap-5xl">
        <YStack className="gap-md">
          <Text className="mx-auto text-text text-lg ">{"Rest time"}</Text>
          <MonoText size="lg" highlight={timeInSeconds > goalValueInSeconds}>
            {formatTimeFromSecondsToMMSS(timeInSeconds)}
          </MonoText>
        </YStack>
        <XStack className="justify-between">
          {exercise.repetitionIncrement.map((increment) => (
            <CTAButton
              key={increment}
              onPress={() => handleRepetitionDone(increment)}
              title={increment.toString()}
              size="2xl"
              variant="default"
              square
              rounded="md"
              hitSlop={5}
            />
          ))}
        </XStack>
        <XStack className="w-full justify-between">
          {Array.from({ length: NUMBER_OF_STEPS }, (_, index) => {
            const isStepDone = currentStep > index;
            return (
              <View
                key={index}
                className={`w-4 h-4 bg-accent rounded-full ${
                  isStepDone ? "bg-accent" : "bg-gray-200"
                }`}
              />
            );
          })}
        </XStack>
        <Text className="text-text text-2xl mx-auto">
          {repetitionsDone} / {totalRepetitionsGoal}
        </Text>
      </YStack>
    </View>
  );
};
