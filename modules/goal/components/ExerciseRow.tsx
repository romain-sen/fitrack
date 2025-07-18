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
      <Text className="text-base">
        • {label} : {value}
        {unit}
      </Text>
      <View className="flex-row space-x-2">
        <Pressable
          onPress={onDecrement}
          className="bg-gray-200 px-2 py-1 rounded-full"
        >
          <Text className="text-lg font-bold">−</Text>
        </Pressable>
        <Pressable
          onPress={onIncrement}
          className="bg-gray-200 px-2 py-1 rounded-full"
        >
          <Text className="text-lg font-bold">+</Text>
        </Pressable>
      </View>
    </View>
  );
};
