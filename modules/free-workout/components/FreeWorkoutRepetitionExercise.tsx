import { CTAButton } from "@/components/ui/CTAButton";
import { MonoText } from "@/components/ui/MonoText";
import { TextInput } from "@/components/ui/TextInput";
import { XStack } from "@/components/ui/XStack";
import { YStack } from "@/components/ui/YStack";
import { useChronometer } from "@/modules/activity/hooks/useChronometer";
import {
  useCurrentExerciseName,
  useFreeWorkoutStoreActions,
} from "@/stores/useFreeWorkoutStore";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const NUMBER_OF_STEPS = 10;
const SECONDS_BEFORE_HIGHLIGHT = 60;

interface FreeWorkoutRepetitionExerciseProps {
  onFinishWorkout: () => void;
}

export const FreeWorkoutRepetitionExercise = ({
  onFinishWorkout,
}: FreeWorkoutRepetitionExerciseProps) => {
  const [repetitionsDone, setRepetitionsDone] = useState(0);
  const totalRepetitionsGoal = 100;
  const {
    addRepsToCurrentExercise,
    startNextExercise,
    updateCurrentExerciseName,
  } = useFreeWorkoutStoreActions();
  const currentExerciseName = useCurrentExerciseName();

  // If stepProgress is 0.1, it means we have done 10% of the total repetitions goal
  // If stepProgress is 0.14 we are between step 1 and 2, but we don't highlight step 2
  // Need to round the stepProgress to the step before
  const stepProgress = repetitionsDone / totalRepetitionsGoal;
  const currentStep = Math.floor(stepProgress * NUMBER_OF_STEPS);

  const handleRepetitionDone = (numberOfRepetitions: number) => {
    setRepetitionsDone(repetitionsDone + numberOfRepetitions);
    // Add details to the exercise
    addRepsToCurrentExercise({
      numberOfReps: numberOfRepetitions,
      endTimestamp: new Date().getTime(),
    });
    resetTimeOnly();
  };

  const handleNextExercise = () => {
    startNextExercise(new Date().getTime());
  };

  const finishWorkout = () => {
    onFinishWorkout();
  };

  useEffect(() => {
    if (repetitionsDone >= totalRepetitionsGoal) {
      onFinishWorkout();
    }
  }, [repetitionsDone, totalRepetitionsGoal, onFinishWorkout]);

  const { timeInSeconds, resetTimeOnly } = useChronometer({
    countdownInSeconds: 0,
  });

  return (
    <View className="py-5xl px-lg flex-1 items-center bg-background">
      <Text className="text-text text-2xl ">{"Free workout"}</Text>
      <View className="mt-xl w-5/6">
        <TextInput
          containerClassName="mt-xl"
          className="text-center"
          placeholder="Exercise name"
          onChangeText={(text) => updateCurrentExerciseName(text)}
          value={currentExerciseName}
        />
      </View>
      <YStack className="w-full mt-xl flex-1 justify-center gap-5xl">
        <YStack className="gap-md">
          <Text className="mx-auto text-text text-lg ">{"Rest time"}</Text>
          <MonoText
            size="lg"
            highlight={timeInSeconds > SECONDS_BEFORE_HIGHLIGHT}
          >
            {formatTimeFromSecondsToMMSS(timeInSeconds)}
          </MonoText>
        </YStack>
        <XStack className="justify-between">
          {[1, 3, 5, 10].map((increment) => (
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
        <XStack className="align-center mx-auto gap-sm items-end">
          <Text className="text-text text-2xl   ">{repetitionsDone}</Text>
          <Text className="text-text text-md mb-1">{"reps"}</Text>
        </XStack>
      </YStack>
      <XStack className="w-full justify-between px-xl">
        <CTAButton
          onPress={finishWorkout}
          title="Finish workout"
          size="md"
          variant="outline"
        />
        <CTAButton
          onPress={handleNextExercise}
          title="Next exercise"
          size="md"
        />
      </XStack>
    </View>
  );
};
