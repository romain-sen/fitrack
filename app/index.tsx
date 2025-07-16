import { TimeGoalDetailed } from "@/modules/home/components/TimeGoalDetailed";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import "../global.css";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-4">
      <Text className="text-2xl font-semibold mb-6">Murph circuit</Text>

      <TouchableOpacity className="bg-black px-6 py-3 rounded-xl mb-6">
        <Text className="text-white text-xl font-bold">Start</Text>
      </TouchableOpacity>

      <TimeGoalDetailed />

      <TouchableOpacity className="bg-gray-200 px-6 py-3 rounded-xl">
        <Text className="text-lg font-medium">Previous score</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
