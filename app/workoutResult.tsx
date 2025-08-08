import { CTAButton } from "@/components/ui/CTAButton";
import { MonoText } from "@/components/ui/MonoText";
import { YStack } from "@/components/ui/YStack";
import { calculateTotalTransitionTime } from "@/modules/workoutResult/utils/calculateTotalTransitionTime";
import {
  useWorkoutSteps,
  useWorkoutStoreActions,
} from "@/stores/useWorkoutStore";
import { formatTimeFromMsToMMSS } from "@/utils/formatTime";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutResult() {
  const workoutSteps = useWorkoutSteps();
  const { saveWorkoutToLocalStorage } = useWorkoutStoreActions();
  const router = useRouter();

  const goHome = () => {
    saveWorkoutToLocalStorage();
    router.replace("/");
  };

  const lastTimestamp = workoutSteps[workoutSteps.length - 1]?.endTimestamp;
  const firstTimestamp = workoutSteps[0]?.startTimestamp;
  if (!firstTimestamp || !lastTimestamp) {
    console.log("workoutSteps", workoutSteps);
    throw new Error("First and last timestamps should be defined");
  }

  const totalTime = lastTimestamp - firstTimestamp;
  const totalTransitionTime = calculateTotalTransitionTime(workoutSteps);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-lg py-xl">
        <YStack className="gap-5xl">
          {/* Header */}
          <View className="items-center">
            <Text className="text-3xl font-bold text-text mb-sm">
              Workout Complete! 🎉
            </Text>
            <MonoText className="text-2xl text-accent" size="lg">
              {formatTimeFromMsToMMSS(totalTime)}
            </MonoText>
          </View>

          {/* Exercise Details */}
          <View className="space-y-md">
            <Text className="text-xl font-semibold text-text">
              Exercise Details
            </Text>
            {workoutSteps.map((step, index) => {
              const duration = step.endTimestamp
                ? Math.floor(step.endTimestamp - (step.startTimestamp || 0))
                : 0;

              return (
                <View key={index} className="bg-card rounded-lg p-md">
                  <View className="flex-row justify-between items-center mb-sm">
                    <Text className="text-lg font-semibold text-text">
                      {step.name}
                    </Text>
                    <Text className="text-text">
                      {step.unit === "km"
                        ? `${step.taskAmount}km`
                        : `${step.taskAmount} reps`}
                    </Text>
                  </View>

                  <View className="space-y-xs">
                    <View className="flex-row justify-between">
                      <Text className="text-text">Duration:</Text>
                      <Text className="text-text">
                        {formatTimeFromMsToMMSS(duration)}
                      </Text>
                    </View>

                    {step.goalValueInSeconds && (
                      <View className="flex-row justify-between">
                        <Text className="text-text">Goal:</Text>
                        <Text className="text-text">
                          {formatTimeFromMsToMMSS(step.goalValueInSeconds)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Total Transition Time */}
          <View className="flex-row justify-between">
            <Text className="text-text">Total Transition Time:</Text>
            <Text className="text-text">
              {formatTimeFromMsToMMSS(totalTransitionTime)}
            </Text>
          </View>

          {/* Home Button */}
          <View className="pt-lg">
            <CTAButton title="Go Home" onPress={goHome} size="lg" />
          </View>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
