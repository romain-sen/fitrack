import { CTAButton } from "@/components/ui/CTAButton";
import { MonoText } from "@/components/ui/MonoText";
import { YStack } from "@/components/ui/YStack";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { Text, View } from "react-native";
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
    <View className="p-5xl flex-1 items-center bg-background">
      <Text className="text-text text-4xl font-semibold ">{exercise.name}</Text>
      <YStack className="w-1/2 mt-xl flex-1 justify-center">
        <Text className="mx-5xl text-text text-lg mt">{"Time left"}</Text>
        <MonoText>
          {formatTimeFromSecondsToMMSS(countdown || timeInSeconds)}
        </MonoText>
      </YStack>
      <CTAButton onPress={markAsDone} title="Mark as done" />
    </View>
  );
};
