import { useState } from "react";
import { Text, View } from "react-native";
import { DEFAULT_TRANSITION_TIME_IN_SEC } from "../constants/defaultTransitionTime";
import { INITIAL_EXERCISE_TIME_GOAL } from "../constants/initialExerciseTimeGoal";
import { calculateTotalGoalTime } from "../util/calculateTotalTime";
import { formatMinutes } from "../util/formatMinutes";
import { ExerciseRow } from "./ExerciseRow";

export const TimeGoalDetailed = () => {
  const [exercises, setExercises] = useState(INITIAL_EXERCISE_TIME_GOAL);
  const [transitionTime, setTransitionTime] = useState(
    DEFAULT_TRANSITION_TIME_IN_SEC
  );

  const totalTimeInMinutes = calculateTotalGoalTime(
    exercises.map((ex) => ({
      ...ex,
      transitionTimeSec: transitionTime,
    }))
  );

  const updateValue = (index: number, delta: number) => {
    setExercises((prev) =>
      prev.map((ex, i) =>
        i === index
          ? {
              ...ex,
              value: Math.max(
                ex.minValue,
                Math.round((ex.value + delta) * 10) / 10
              ),
            }
          : ex
      )
    );
  };

  return (
    <View className="w-full ">
      {/* Total Time Display */}
      <View className="flex-row justify-between items-center mb-md px-lg">
        <Text className="text-base font-medium text-text">Time goal</Text>
        <Text className="text-base text-text">
          {formatMinutes(totalTimeInMinutes)}
        </Text>
      </View>

      {/* Exercise Details */}
      <View className="border border-muted rounded-lg py-md px-lg mb-md space-y-sm bg-surface">
        {exercises.map((ex, index) => (
          <ExerciseRow
            key={index}
            index={index}
            label={ex.label}
            value={ex.value}
            unit={ex.unit}
            onIncrement={() => updateValue(index, ex.step)}
            onDecrement={() => updateValue(index, -ex.step)}
          />
        ))}
      </View>

      {/* Transition Display */}
      <View className="border border-muted rounded-lg py-sm px-md bg-surface">
        <ExerciseRow
          index={exercises.length}
          label={"Transition"}
          value={transitionTime}
          unit={"sec"}
          onIncrement={() => setTransitionTime(transitionTime + 1)}
          onDecrement={() => setTransitionTime(transitionTime - 1)}
        />
      </View>
    </View>
  );
};
