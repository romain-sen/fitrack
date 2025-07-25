import ThemeToggle from "@/components/ThemeToggle";
import { YStack } from "@/components/ui/YStack";
import { TimeGoalDetailed } from "@/modules/goal/components/TimeGoalDetailed";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// @ts-ignore
import murphWallpaper from "../assets/images/murph-wallpaper.png";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <YStack className="flex-1 justify-between px-lg pt-xl pb-5xl gap-2xl">
        {/* Header */}
        <View className="mb-2xl flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-text">Murph circuit</Text>
          <ThemeToggle />
        </View>

        {/* Workout Image */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
        >
          <Image
            source={murphWallpaper}
            resizeMode="contain"
            style={{
              aspectRatio: 1,
              height: 832,
              width: "auto",
              maxHeight: "100%",
            }}
          />
        </ScrollView>

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
          <TouchableOpacity onPress={() => {}} className="items-center">
            <Text className="text-base text-accent-light font-medium">
              Previous score
            </Text>
          </TouchableOpacity>
        </View>
      </YStack>
    </SafeAreaView>
  );
}
