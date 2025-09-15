import { XStack } from "@/components/ui/XStack";
import { Pressable, Text } from "react-native";

interface RowProps {
  index: number;
  label: string;
  value: number;
  unit: string;
  onIncrement: () => void;
  onDecrement: () => void;
  labelClassName?: string;
}

export const ExerciseRow = ({
  label,
  value,
  unit,
  onIncrement,
  onDecrement,
  labelClassName = "",
}: RowProps) => {
  return (
    <XStack className="items-center py-sm">
      {/* Label */}
      <Text
        className={`text-base text-text ${labelClassName}`}
        style={{ flex: 1 }} // take all available space
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>

      {/* Value + Unit */}
      <Text className="text-base text-muted w-auto">
        {value}
        {unit}
      </Text>

      {/* Controls */}
      <XStack className="ml-md gap-sm flex-shrink-0">
        <Pressable
          onPress={onDecrement}
          className="bg-muted/10 px-sm py-xs rounded-md"
        >
          <Text className="text-2xl font-bold text-text">−</Text>
        </Pressable>
        <Pressable
          onPress={onIncrement}
          className="bg-muted/10 px-sm py-xs rounded-md"
        >
          <Text className="text-2xl font-bold text-text">+</Text>
        </Pressable>
      </XStack>
    </XStack>
  );
};
