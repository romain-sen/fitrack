import { Platform, Text } from "react-native";

export const MonoText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Text
    style={{
      ...(Platform.OS === "ios"
        ? {
            fontFamily: "Menlo",
            fontWeight: "semibold",
          }
        : {
            fontFamily: "monospace",
            fontWeight: "bold",
          }),
    }}
    className={`text-text text-4xl text-center ${className}`}
  >
    {children}
  </Text>
);
