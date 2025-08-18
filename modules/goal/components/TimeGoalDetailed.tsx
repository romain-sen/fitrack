import { Text, View } from "react-native";
import { useGoals, useTransitionTime } from "../states/goalsAtom";
import {
  useSetWeightAdded,
  useWeightAddedValue,
} from "../states/weightAddedAtom";
import {
  calculateExerciseTimeInSeconds,
  calculateTotalGoalTime,
} from "../util/calculateTotalTime";
import { formatMinutes } from "../util/formatMinutes";
import { ExerciseRow } from "./ExerciseRow";

export const TimeGoalDetailed = () => {
  const [exercises, setExercises] = useGoals();
  const [transitionTime, setTransitionTime] = useTransitionTime();
  const weightAdded = useWeightAddedValue();

  const setWeightAdded = useSetWeightAdded();

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
    <View className="w-full space-y-lg">
      {/* Title and total time */}
      <View className="px-lg">
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

      {/* Weight added */}
      <View className="px-lg mt-lg">
        <Text className="text-base font-medium text-muted">Weight added</Text>
        <ExerciseRow
          index={exercises.length + 1}
          label={""}
          labelClassName="font-semibold text-text text-xl"
          value={weightAdded}
          unit={"kg"}
          onIncrement={() => setWeightAdded(weightAdded + 1)}
          onDecrement={() => setWeightAdded(weightAdded - 1)}
        />
      </View>
    </View>
  );
};
