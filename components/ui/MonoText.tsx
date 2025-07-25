import React from "react";
import { Platform, Text, TextProps } from "react-native";
import { tv } from "tailwind-variants";

const monoText = tv({
  base: "text-text text-center",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-xl",
      lg: "text-4xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

interface MonoTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const MonoText: React.FC<MonoTextProps> = ({
  children,
  className = "",
  size,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={{
        ...(Platform.OS === "ios"
          ? {
              fontFamily: "Menlo",
              fontWeight: "600",
            }
          : {
              fontFamily: "monospace",
              fontWeight: "bold",
            }),
      }}
      className={monoText({ size, className })}
    >
      {children}
    </Text>
  );
};
