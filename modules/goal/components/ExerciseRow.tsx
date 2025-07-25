import { XStack } from "@/components/ui/XStack";
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
        {label}{" "}
        <Text className="text-muted">
          {value}
          {unit}
        </Text>
      </Text>
      <XStack className="gap-xs">
        <Pressable
          onPress={onDecrement}
          className="bg-muted/10 px-sm py-xss rounded-md"
        >
          <Text className="text-lg font-bold text-text">−</Text>
        </Pressable>
        <Pressable
          onPress={onIncrement}
          className="bg-muted/10 px-sm py-xxs rounded-md"
        >
          <Text className="text-lg font-bold text-text">+</Text>
        </Pressable>
      </XStack>
    </View>
  );
};
