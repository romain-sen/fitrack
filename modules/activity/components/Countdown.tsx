import { Text, View } from "react-native";

interface CountdownProps {
  countdown: number;
}

export const Countdown = ({ countdown }: CountdownProps) => {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <View className="items-center">
        <Text className="text-6xl font-bold text-accent mb-4">{countdown}</Text>
        <Text className="text-lg text-text">Get ready!</Text>
      </View>
    </View>
  );
};
