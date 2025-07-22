import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { Button, Text, View } from "react-native";
import { useChronometer } from "../../hooks/useChronometer";

interface TransitionTrackingProps {
  markAsDone: () => void;
}

export const TransitionTracking = ({ markAsDone }: TransitionTrackingProps) => {
  const { countdown, timeInSeconds } = useChronometer({
    countdownInSeconds: 0,
    speedFactor: 2,
  });

  return (
    <View className="bg-green-500 p-5xl rounded-xl">
      <Text className="text-text text-4xl font-semibold ">{"Transition"}</Text>
      <Text className="text-text text-lg">{"Time left"}</Text>
      <Text className="text-text text-4xl font-semibold ">
        {formatTimeFromSecondsToMMSS(countdown || timeInSeconds)}
      </Text>
      <Button onPress={markAsDone} title="Mark as done" />
    </View>
  );
};
