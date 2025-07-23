import { YStack } from "@/components/ui/YStack";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { Button, Platform, Text, View } from "react-native";
import { useChronometer } from "../../hooks/useChronometer";
import { Exercise } from "../../types/Exercise";

interface ExerciseTrackingProps {
  exercise: Exercise;
  markAsDone: () => void;
}

export const ExerciseTracking = ({
  exercise,
  markAsDone,
}: ExerciseTrackingProps) => {
  const { countdown, timeInSeconds } = useChronometer({
    countdownInSeconds: exercise.goalValueInSeconds ?? 0,
    speedFactor: 10,
  });

  return (
    <View className="bg-green-500 p-5xl rounded-xl flex-1 items-center">
      <Text className="text-text text-4xl font-semibold ">{exercise.name}</Text>
      <YStack className="w-1/2 mt-xl bg-teal-300 flex-1  justify-center">
        <Text className="mx-5xl text-text text-lg mt">{"Time left"}</Text>
        <Text
          style={{ fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace" }}
          className="text-text text-4xl font-semibold text-center"
        >
          {formatTimeFromSecondsToMMSS(countdown || timeInSeconds)}
        </Text>
      </YStack>
      <Button onPress={markAsDone} title="Mark as done" />
    </View>
  );
};
