import { Pressable, Text, View } from "react-native";

interface RowProps {
  index: number;
  label: string;
  value: number;
  unit: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const ExerciseRow = ({
  label,
  value,
  unit,
  onIncrement,
  onDecrement,
}: RowProps) => {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-base text-text">
        • {label} : {value}
        {unit}
      </Text>
      <View className="flex-row space-x-sm">
        <Pressable
          onPress={onDecrement}
          className="bg-muted px-sm py-xss rounded-lg items-center justify-center"
        >
          <Text className="text-lg font-bold text-text text-center">−</Text>
        </Pressable>
        <Pressable
          onPress={onIncrement}
          className="bg-muted px-sm py-xxs rounded-lg items-center justify-center"
        >
          <Text className="text-lg font-bold text-text text-center">+</Text>
        </Pressable>
      </View>
    </View>
  );
};
