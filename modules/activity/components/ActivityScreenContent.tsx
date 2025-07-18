import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Chronometer } from "./Chonometer";
import { StopResetButton } from "./StopResetButton";

export const ActivityScreenContent = () => {
  const [running, setRunning] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(5);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setRunning(true);
      setCountdown(null);
    }
  }, [countdown]);

  const resetActivity = () => {
    setRunning(false);
    setCountdown(5);
  };

  if (countdown !== null && countdown > 0) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <View className="items-center">
          <Text className="text-6xl font-bold text-accent mb-4">
            {countdown}
          </Text>
          <Text className="text-lg text-text">Get ready!</Text>
        </View>
      </View>
    );
  }

  if (!running) {
    return (
      <View className="flex-1 bg-background py-xl px-lg">
        <Text className="text-lg text-text">Activity</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background py-xl px-lg">
      <Chronometer running={running} />
      <View className="mt-auto">
        <StopResetButton onPress={resetActivity} />
      </View>
    </View>
  );
};
