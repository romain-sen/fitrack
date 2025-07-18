import ThemeToggle from "@/components/ThemeToggle";
import { TimeGoalDetailed } from "@/modules/goal/components/TimeGoalDetailed";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8 px-6">
        <Text className="text-2xl font-bold text-text">Murph circuit</Text>
        <ThemeToggle />
      </View>

      {/* Contenu principal */}
      <View className="flex-1 justify-center items-center gap-6 px-6">
        {/* Bouton principal avec orange vif */}
        <TouchableOpacity className="bg-accent px-8 py-4 rounded-full shadow-md">
          <Text className="text-background text-xl font-bold">Start</Text>
        </TouchableOpacity>

        <TimeGoalDetailed />

        {/* Bouton secondaire, bordure orange clair */}
        <TouchableOpacity className="border border-accent-light px-6 py-3 rounded-full">
          <Text className="text-text text-base font-medium">
            Previous score
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
