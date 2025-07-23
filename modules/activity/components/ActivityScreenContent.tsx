import { YStack } from "@/components/ui/YStack";
import { formatTimeFromSecondsToHHMMSS } from "@/utils/formatTime";
import { Text, View } from "react-native";
import { useChronometer } from "../hooks/useChronometer";
import { WorkoutTracking } from "./WorkoutStepTrack/WorkoutTracking";

const COUNTDOWN_TIME_BEFORE_START = 3;

export const ActivityScreenContent = () => {
  const { countdown, running, resetChronometerAndCountdown, timeInSeconds } =
    useChronometer({
      countdownInSeconds: COUNTDOWN_TIME_BEFORE_START,
      speedFactor: 2,
    });

  const finishWorkout = () => {
    // pauseChronometer();
    console.log("Workout finished");
    // TODO : redirect to results screen
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
        <Text className="text-lg text-text">Loading...</Text>
      </View>
    );
  }

  return (
    <YStack className="flex-1 bg-yellow-600 py-xl px-lg">
      <View className="items-center">
        <Text className="text-4xl font-mono text-text">
          {formatTimeFromSecondsToHHMMSS(timeInSeconds)}
        </Text>
      </View>
      <WorkoutTracking
        timeInSeconds={timeInSeconds}
        finishWorkout={finishWorkout}
      />
    </YStack>
  );
};
