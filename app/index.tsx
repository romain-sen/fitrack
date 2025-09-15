import { YStack } from "@/components/ui/YStack";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <YStack className="flex-1 justify-center items-center px-lg gap-2xl">
        {/* Workout Buttons */}
        <YStack className="gap-lg w-80">
          <TouchableOpacity
            onPress={() => router.push("/murph")}
            className="bg-accent py-lg rounded-2xl shadow-md items-center justify-center"
          >
            <Text className="text-xl font-bold text-background">
              Murph Workout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/freeWorkout")}
            className="bg-accent py-lg rounded-2xl shadow-md items-center justify-center"
          >
            <Text className="text-xl font-bold text-background">
              Free Workout
            </Text>
          </TouchableOpacity>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
