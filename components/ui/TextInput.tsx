import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from "react-native";

interface CustomTextInputProps extends Omit<RNTextInputProps, "className"> {
  label?: string;
  className?: string;
  containerClassName?: string;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  className = "",
  containerClassName = "",
  ...props
}) => {
  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text className="text-text font-medium mb-sm text-base">{label}</Text>
      )}

      <RNTextInput
        {...props}
        textAlignVertical="center"
        className={`text-text bg-surface border border-muted rounded-sm px-lg text-lg ${className}`}
        placeholderTextColor="var(--color-muted)"
        style={{
          fontFamily: "System",
          lineHeight: 22,
          paddingVertical: 12,
          fontWeight: "bold",
        }}
      />
    </View>
  );
};
