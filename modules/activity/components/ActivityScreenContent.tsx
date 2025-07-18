import { useState } from "react";
import { Text, View } from "react-native";
import { useCountdown } from "../hooks/useCountdown";
import { Chronometer } from "./Chronometer";
import { Countdown } from "./Countdown";
import { StopResetButton } from "./StopResetButton";

export const ActivityScreenContent = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const { countdown, running, resetCountdown } = useCountdown();

  if (countdown !== null && countdown > 0) {
    return <Countdown countdown={countdown} />;
  }

  if (!running) {
    return (
      <View className="flex-1 bg-background py-xl px-lg">
        <Text className="text-lg text-text">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background py-xl px-lg">
      <Chronometer
        running={running}
        timeInSeconds={timeInSeconds}
        setTimeInSeconds={setTimeInSeconds}
      />
      <View className="mt-auto">
        <StopResetButton onPress={resetCountdown} />
      </View>
    </View>
  );
};
