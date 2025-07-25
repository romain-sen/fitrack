import { MonoText } from "@/components/ui/MonoText";
import { YStack } from "@/components/ui/YStack";
import { formatTimeFromSecondsToHHMMSS } from "@/utils/formatTime";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useChronometer } from "../hooks/useChronometer";
import { WorkoutTracking } from "./WorkoutStepTrack/WorkoutTracking";

const COUNTDOWN_TIME_BEFORE_START = 3;

export const ActivityScreenContent = () => {
  const router = useRouter();
  const { countdown, running, resetChronometerAndCountdown, timeInSeconds } =
    useChronometer({
      countdownInSeconds: COUNTDOWN_TIME_BEFORE_START,
    });

  const finishWorkout = () => {
    console.log("Workout finished");
    router.push("/workoutResult");
  };

  if (countdown !== null && countdown > 0) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <View className="items-center">
          <Text className="text-6xl font-bold text-accent mb-xl">
            {countdown}
          </Text>
          <Text className="text-lg text-text">Get ready!</Text>
        </View>
      </View>
    );
  }

  if (!running) {
    return (
      <View className="flex-1 bg-background py-xl px-lg justify-center items-center">
        <Text className="text-lg text-text">Loading...</Text>
      </View>
    );
  }

  return (
    <YStack className="flex-1 bg-background py-xl px-lg space-y-3xl">
      <View className="items-center">
        <MonoText className="text-2xl text-text" size="lg">
          {formatTimeFromSecondsToHHMMSS(timeInSeconds)}
        </MonoText>
      </View>

      <WorkoutTracking
        timeInSeconds={timeInSeconds}
        finishWorkout={finishWorkout}
      />
    </YStack>
  );
};
