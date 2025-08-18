import { YStack } from "@/components/ui/YStack";
import { Exercise } from "@/modules/activity/types/Exercise";
import { Workout } from "@/modules/activity/types/Workout";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { getWorkoutsFromStorage } from "@/utils/storage";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PreviousScore() {
  const workouts = getWorkoutsFromStorage();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const formatDate = (dateTimestamp: number) => {
    const date = new Date(dateTimestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTotalExercises = (workout: Workout) => {
    return workout.exercises.reduce((total, exercise) => {
      return total + exercise.details.length;
    }, 0);
  };

  const getExerciseTotalTime = (exercise: Exercise) => {
    if (exercise.startTimestamp && exercise.endTimestamp) {
      return Math.floor(
        (exercise.endTimestamp - exercise.startTimestamp) / 1000
      );
    }
    return 0;
  };

  const renderWorkoutCard = (workout: Workout, index: number) => {
    const isSelected = selectedWorkout?.dateTimestamp === workout.dateTimestamp;

    return (
      <TouchableOpacity
        key={workout.dateTimestamp}
        onPress={() => setSelectedWorkout(isSelected ? null : workout)}
        className={`p-md rounded-lg border ${
          isSelected ? "bg-primary/10 border-primary" : "bg-card border-border"
        }`}
      >
        <View className="flex-row justify-between items-center mb-sm">
          <Text className="text-lg font-semibold text-text">
            Workout #{workouts.length - index}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {formatDate(workout.dateTimestamp)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-muted-foreground">Total Time</Text>
            <Text className="text-lg font-bold text-text">
              {formatTimeFromSecondsToMMSS(workout.totalTime)}
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-sm text-muted-foreground">Added Weight</Text>
            <Text className="text-lg font-bold text-text">
              {workout.addedWeightInKg} kg
            </Text>
          </View>
        </View>

        {isSelected && (
          <View className="mt-md pt-md border-t border-border">
            <Text className="text-sm font-semibold text-text mb-sm">
              Exercise Details:
            </Text>
            {workout.exercises.map((exercise, exerciseIndex) => (
              <View
                key={exerciseIndex}
                className="flex-row justify-between items-center py-sm"
              >
                <Text className="text-sm text-text">{exercise.name}</Text>
                <Text className="text-sm text-text">
                  {formatTimeFromSecondsToMMSS(getExerciseTotalTime(exercise))}
                </Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-lg py-xl">
        <YStack className="gap-5xl">
          {/* Header */}
          <View className="items-center">
            <Text className="text-3xl font-bold text-text mb-sm">
              Previous Scores
            </Text>
            <Text className="text-muted-foreground text-center">
              {workouts.length === 0
                ? "No workouts completed yet"
                : `${workouts.length} workout${workouts.length === 1 ? "" : "s"} completed`}
            </Text>
          </View>

          {/* Workouts List */}
          {workouts.length > 0 && (
            <YStack className="gap-md">
              {workouts
                .slice()
                .reverse()
                .map((workout: Workout, index: number) =>
                  renderWorkoutCard(workout, index)
                )}
            </YStack>
          )}

          {/* Empty State */}
          {workouts.length === 0 && (
            <View className="flex-1 justify-center items-center py-5xl">
              <Text className="text-xl text-muted-foreground text-center">
                Complete your first workout to see your scores here!
              </Text>
            </View>
          )}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
