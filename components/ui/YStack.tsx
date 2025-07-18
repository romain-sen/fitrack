import { View } from "react-native";

export const YStack = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const defaultStyle = "flex-col";
  return <View className={`${defaultStyle} ${className}`}>{children}</View>;
};
