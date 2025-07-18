import { useState } from "react";
import { Text, View } from "react-native";
import { useChronometer } from "../hooks/useChronometer";
import { Chronometer } from "./Chronometer";
import { Countdown } from "./Countdown";
import { StopResetButton } from "./StopResetButton";
import { WorkoutTracking } from "./WorkoutStepTrack/WorkoutTracking";

export const ActivityScreenContent = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const { countdown, running, resetChronometerAndCountdown, pauseChronometer } =
    useChronometer();

  const finishWorkout = () => {
    // pauseChronometer();
    console.log("Workout finished");
    // TODO : redirect to results screen
  };

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
      <WorkoutTracking
        timeInSeconds={timeInSeconds}
        finishWorkout={finishWorkout}
      />
      <View className="mt-auto">
        <StopResetButton onPress={resetChronometerAndCountdown} />
      </View>
    </View>
  );
};
