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
      xl: "text-5xl",
    },
    highlight: {
      true: "text-accent",
      false: "",
    },
  },
  defaultVariants: {
    size: "lg",
    highlight: false,
  },
});

interface MonoTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  highlight?: boolean;
}

export const MonoText: React.FC<MonoTextProps> = ({
  children,
  className = "",
  size = "xl",
  highlight = false,
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
      className={monoText({ size, highlight, className })}
    >
      {children}
    </Text>
  );
};
