import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
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
  const { countdown, running, timeInSeconds } = useChronometer({
    countdownInSeconds: exercise.goalValueInSeconds ?? 0,
    speedFactor: 10,
  });

  useEffect(() => {
    console.log("exercise", exercise);
  }, [exercise]);

  return (
    <View className="bg-green-500 p-5xl rounded-xl">
      <Text className="text-text text-4xl font-semibold ">{exercise.name}</Text>
      <Text className="text-text text-lg">{"Time left"}</Text>
      <Text className="text-text text-4xl font-semibold ">
        {formatTimeFromSecondsToMMSS(countdown || timeInSeconds)}
      </Text>
      <Button onPress={markAsDone} title="Mark as done" />
    </View>
  );
};
