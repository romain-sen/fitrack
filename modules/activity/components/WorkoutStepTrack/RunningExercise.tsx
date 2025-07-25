import { CTAButton } from "@/components/ui/CTAButton";
import { MonoText } from "@/components/ui/MonoText";
import { YStack } from "@/components/ui/YStack";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { Text, View } from "react-native";
import { Exercise } from "../../types/Exercise";

interface RunningExerciseProps {
  exercise: Exercise;
  markAsDone: () => void;
  countdown: number | null;
  timeInSeconds: number;
}

export const RunningExercise = ({
  exercise,
  markAsDone,
  countdown,
  timeInSeconds,
}: RunningExerciseProps) => {
  return (
    <View className="p-5xl flex-1 items-center bg-background">
      <Text className="text-text text-4xl font-semibold ">{exercise.name}</Text>
      <YStack className="w-1/2 mt-xl flex-1 justify-center gap-md">
        <Text className="mx-auto text-text text-lg mt">{"Time left"}</Text>
        <MonoText size="lg">
          {formatTimeFromSecondsToMMSS(countdown || timeInSeconds)}
        </MonoText>
      </YStack>
      <CTAButton onPress={markAsDone} title="Mark as done" size="lg" />
    </View>
  );
};
