import { CTAButton } from "@/components/ui/CTAButton";
import { MonoText } from "@/components/ui/MonoText";
import { XStack } from "@/components/ui/XStack";
import { YStack } from "@/components/ui/YStack";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Exercise } from "../../types/Exercise";

const NUMBER_OF_STEPS = 10;

interface RepetitionExerciseProps {
  exercise: Exercise;
  markAsDone: () => void;
  countdown: number | null;
  timeInSeconds: number;
}

export const RepetitionExercise = ({
  exercise,
  markAsDone,
  countdown,
  timeInSeconds,
}: RepetitionExerciseProps) => {
  const [repetitionsDone, setRepetitionsDone] = useState(0);
  const totalRepetitionsGoal = exercise.taskAmount;

  const handleRepetitionDone = (numberOfRepetitions: number) => {
    setRepetitionsDone(repetitionsDone + numberOfRepetitions);
  };

  useEffect(() => {
    if (repetitionsDone >= totalRepetitionsGoal) {
      markAsDone();
    }
  }, [repetitionsDone, totalRepetitionsGoal, markAsDone]);

  return (
    <View className="p-5xl flex-1 items-center bg-background">
      <Text className="text-text text-4xl font-semibold ">{exercise.name}</Text>
      <YStack className="w-full mt-xl flex-1 justify-center gap-5xl">
        <Text className="mx-auto text-text text-lg mt">{"Time left"}</Text>
        <MonoText>
          {formatTimeFromSecondsToMMSS(countdown || timeInSeconds)}
        </MonoText>
        <XStack className="justify-between">
          {exercise.repetitionIncrement.map((increment) => (
            <RepetitionIncrementButton
              key={increment}
              increment={increment}
              onPress={() => handleRepetitionDone(increment)}
            />
          ))}
        </XStack>
        <XStack className="w-full justify-between">
          {Array.from({ length: NUMBER_OF_STEPS }, (_, index) => (
            <StepIndicator
              key={index}
              repetitionsDone={repetitionsDone}
              totalRepetitionsGoal={totalRepetitionsGoal}
              stepIndex={index}
            />
          ))}
        </XStack>
        <Text className="text-text text-lg mx-auto">
          {repetitionsDone} / {totalRepetitionsGoal}
        </Text>
      </YStack>
      <CTAButton onPress={markAsDone} title="Mark as done" size="lg" />
    </View>
  );
};

const RepetitionIncrementButton = ({
  increment,
  onPress,
}: {
  increment: number;
  onPress: () => void;
}) => {
  return (
    <CTAButton
      onPress={onPress}
      title={increment.toString()}
      size="md"
      variant="outline"
      square
      rounded="sm"
    />
  );
};

const StepIndicator = ({
  repetitionsDone,
  totalRepetitionsGoal,
  stepIndex,
}: {
  repetitionsDone: number;
  totalRepetitionsGoal: number;
  stepIndex: number;
}) => {
  const stepProgress = repetitionsDone / totalRepetitionsGoal;
  // If stepProgress is 0.1, it means we have done 10% of the total repetitions goal
  // If stepProgress is 0.14 we are between step 1 and 2, but we don't highlight step 2
  // Need to round the stepProgress to the step before
  const roundedStepProgress = Math.floor(stepProgress * NUMBER_OF_STEPS);
  const isStepDone = roundedStepProgress > stepIndex;

  return (
    <View
      className={`w-4 h-4 bg-accent rounded-full ${
        isStepDone ? "bg-accent" : "bg-gray-200"
      }`}
    />
  );
};
