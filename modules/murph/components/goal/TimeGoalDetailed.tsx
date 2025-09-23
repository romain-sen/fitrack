import { Text, View } from "react-native";

import { YStack } from "@/components/ui/YStack";
import { useState } from "react";
import { INITIAL_EXERCISE_TIME_GOAL } from "../../constants/initialExerciseTimeGoal";
import { ExerciseGoal } from "../../types/ExerciseGoal";
import {
  calculateExerciseTimeInSeconds,
  calculateTotalGoalTime,
} from "../../util/calculateTotalTime";
import { formatMinutes } from "../../util/formatMinutes";
import { ExerciseRow } from "./ExerciseRow";

export const TimeGoalDetailed = () => {
  const [exercises, setExercises] = useState<ExerciseGoal[]>(
    INITIAL_EXERCISE_TIME_GOAL
  );
  const [transitionTime, setTransitionTime] = useState<number>(0);

  const totalTimeInMinutes = calculateTotalGoalTime(
    exercises.map((ex) => ({
      ...ex,
      transitionTimeSec: transitionTime,
    }))
  );

  const updateGoalValue = (index: number, delta: number) => {
    setExercises((prev) =>
      prev.map((ex, i) =>
        i === index
          ? {
              ...ex,
              goalValueInUnit: Math.max(
                ex.minValueInUnit,
                Math.round((ex.goalValueInUnit + delta) * 10) / 10
              ),
              goalValueInSeconds: calculateExerciseTimeInSeconds(ex),
            }
          : ex
      )
    );
  };

  return (
    <YStack className="w-full space-y-lg gap-3xl mt-xl">
      {/* Title and total time */}
      <View>
        <Text className="text-base font-medium text-muted">Time goal</Text>
        <Text className="text-2xl font-semibold text-text">
          {formatMinutes(totalTimeInMinutes)}
        </Text>
      </View>

      {/* Exercise list */}
      <View className="space-y-md px-lg">
        {exercises.map((ex, index) => (
          <ExerciseRow
            key={index}
            index={index}
            label={ex.label}
            value={ex.goalValueInUnit}
            unit={ex.unit}
            onIncrement={() => updateGoalValue(index, ex.adjustingStep)}
            onDecrement={() => updateGoalValue(index, -ex.adjustingStep)}
          />
        ))}
      </View>

      {/* Transition */}
      <View className="px-lg">
        <ExerciseRow
          index={exercises.length}
          label={"Transition"}
          value={transitionTime}
          unit={"sec"}
          onIncrement={() => setTransitionTime(transitionTime + 1)}
          onDecrement={() => setTransitionTime(transitionTime - 1)}
        />
      </View>
    </YStack>
  );
};
