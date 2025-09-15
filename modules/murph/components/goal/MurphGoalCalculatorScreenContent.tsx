import { YStack } from "@/components/ui/YStack";
import { SafeAreaView, Text } from "react-native";
import { TimeGoalDetailed } from "./TimeGoalDetailed";

export const MurphGoalCalculatorScreenContent = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <YStack className="flex-1 px-xl py-xl gap-xl">
        <Text className="text-2xl font-bold text-text">
          Murph Goal Calculator
        </Text>
        <TimeGoalDetailed />
      </YStack>
    </SafeAreaView>
  );
};
