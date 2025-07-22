import { ActivityIndicator, View } from "react-native";

interface SpinnerProps {
  size?: "small" | "large";
  color?: string;
  className?: string;
}

export const Spinner = ({
  size = "large",
  color = "var(--color-accent)",
  className = "",
}: SpinnerProps) => {
  return (
    <View className={`justify-center items-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
