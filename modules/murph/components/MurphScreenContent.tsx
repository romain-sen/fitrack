import { YStack } from "@/components/ui/YStack";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";

import { CTAButton } from "@/components/ui/CTAButton";
import { useWorkoutStoreActions } from "@/stores/useWorkoutStore";
import { useEffect } from "react";

export const MurphScreenContent = () => {
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
      <YStack className="flex-1 justify-center w-2/3 mx-auto gap-xl">
        <CTAButton
          onPress={() => router.push("/murph/goalCalculator")}
          title="Murph Goal Calculator"
          size="lg"
          variant="outline"
        />

        <CTAButton
          title="Start"
          onPress={() => router.push("/activity")}
          size="lg"
        />

        <CTAButton
          onPress={() => router.push("/previousScore")}
          title="Previous score"
          size="lg"
          variant="outline"
        />
      </YStack>
    </SafeAreaView>
  );
};
