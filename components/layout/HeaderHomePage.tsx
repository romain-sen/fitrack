import { Text, View } from "react-native";
import ThemeToggle from "../ThemeToggle";

export const HeaderHomePage = () => {
  return (
    <View className="bg-background justify-between px-3xl pt-safe gap-2xl">
      {/* Header */}
      <View className="mb-2xl flex-row justify-between items-center">
        <Text className="text-4xl font-bold text-accent font-system shadow-black">
          Fitrack
        </Text>
        <ThemeToggle />
      </View>
    </View>
  );
};
