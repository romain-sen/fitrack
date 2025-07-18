import { View } from "react-native";

export const XStack = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const defaultStyle = "flex-row";
  return <View className={`${defaultStyle} ${className}`}>{children}</View>;
};
