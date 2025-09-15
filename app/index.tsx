import { CTAButton } from "@/components/ui/CTAButton";
import { YStack } from "@/components/ui/YStack";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <YStack className="flex-1 justify-center items-center px-lg gap-2xl">
        {/* Workout Buttons */}
        <YStack className="gap-lg w-80">
          <CTAButton
            onPress={() => router.push("/murph")}
            title="Murph Workout"
            size="lg"
            variant="default"
          />

          <CTAButton
            onPress={() => router.push("/freeWorkout")}
            title="Free Workout"
            size="lg"
            variant="outline"
          />
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
