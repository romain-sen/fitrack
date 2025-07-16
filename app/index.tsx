import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-4">
      <Text className="text-2xl font-semibold mb-6">Murph circuit</Text>

      <TouchableOpacity className="bg-black px-6 py-3 rounded-xl mb-6">
        <Text className="text-white text-xl font-bold">Start</Text>
      </TouchableOpacity>

      <View className="flex-row justify-between w-full mb-4">
        <View className="flex-1 items-center">
          <Text className="text-base font-medium">Time goal</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-base">48min</Text>
        </View>
      </View>

      <View className="w-full border border-gray-300 rounded-xl p-4 mb-4">
        <Text className="text-base mb-1">• Running : 6:00 min/km</Text>
        <Text className="text-base mb-1">• Pull ups : 10/min</Text>
        <Text className="text-base mb-1">• Push ups : 20/min</Text>
        <Text className="text-base mb-1">• Squats : 30/min</Text>
        <Text className="text-base">• Running : 7:00 min/km</Text>
      </View>

      <View className="w-full border border-gray-300 rounded-xl p-2 mb-6">
        <Text className="text-base">• Transition : 20 sec</Text>
      </View>

      <TouchableOpacity className="bg-gray-200 px-6 py-3 rounded-xl">
        <Text className="text-lg font-medium">Previous score</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
