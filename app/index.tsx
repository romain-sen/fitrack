import ThemeToggle from "@/components/ThemeToggle";
import { CTAButton } from "@/components/ui/CTAButton";
import { TimeGoalDetailed } from "@/modules/goal/components/TimeGoalDetailed";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-md px-md pt-sm">
        <Text className="text-2xl font-bold text-text">Murph circuit</Text>
        <ThemeToggle />
      </View>

      <View className="flex-1 justify-center items-center gap-md px-md">
        <CTAButton onPress={() => router.push("/activity")} title="Start" />

        <TimeGoalDetailed />

        <TouchableOpacity className="border border-accent-light px-md py-sm rounded-md">
          <Text className="text-text text-base font-medium">
            Previous score
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
