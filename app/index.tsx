import ThemeToggle from "@/components/ThemeToggle";
import { YStack } from "@/components/ui/YStack";
import { TimeGoalDetailed } from "@/modules/goal/components/TimeGoalDetailed";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { useWorkoutStoreActions } from "@/stores/useWorkoutStore";
import { useEffect } from "react";
// @ts-ignore

export default function App() {
  const { resetWorkout } = useWorkoutStoreActions();

  const router = useRouter();

  useEffect(() => {
    // Reset the workout because when coming from the workoutResult screen
    // the workout is not reset, workoutCompleted is true and on the next screen
    // it will immediately end the workout before it can be reset
    resetWorkout();
  }, [resetWorkout]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <YStack className="flex-1 justify-between px-lg pt-xl pb-5xl gap-2xl">
        {/* Header */}
        <View className="mb-2xl flex-row justify-between items-center">
          <Text className="text-4xl font-bold text-accent font-system shadow-black">
            Fitrack
          </Text>
          <ThemeToggle />
        </View>

        {/* Start Button */}
        <TouchableOpacity
          onPress={() => router.push("/activity")}
          className="bg-accent py-lg rounded-2xl shadow-md items-center justify-center"
        >
          <Text className="text-xl font-bold text-background">Start</Text>
        </TouchableOpacity>

        {/* Time Goal Section */}
        <TimeGoalDetailed />

        {/* Fixed bottom section for "Previous score" */}
        <View className="px-lg py-md bg-background border-t border-muted/30">
          <TouchableOpacity
            onPress={() => router.push("/previousScore")}
            className="items-center"
          >
            <Text className="text-base text-accent-light font-medium">
              Previous score
            </Text>
          </TouchableOpacity>
        </View>
      </YStack>
    </SafeAreaView>
  );
}
