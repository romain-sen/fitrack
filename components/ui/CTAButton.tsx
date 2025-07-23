import React from "react";
import { Pressable, PressableProps, Text } from "react-native";
import { tv } from "tailwind-variants";

const button = tv({
  base: "rounded-xl px-4xl items-center justify-center shadow-md active:opacity-80",
  variants: {
    variant: {
      default: "bg-accent",
      outline: "border border-accent bg-transparent",
      ghost: "bg-transparent",
    },
    size: {
      sm: "px-xl py-xs text-sm",
      md: "px-3xl py-sm text-base",
      lg: "px-4xl py-md text-lg",
    },
    disabled: {
      true: "opacity-50",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface CTAButtonProps extends PressableProps {
  title: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  onPress,
  variant,
  size,
  disabled,
  ...props
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255, 183, 51, 0.2)" }}
      disabled={disabled}
      className={button({ variant, size, disabled: disabled ?? false })}
      {...props}
    >
      <Text
        className={
          variant === "outline" || variant === "ghost"
            ? "text-accent font-semibold"
            : "text-primary font-semibold"
        }
      >
        {title}
      </Text>
    </Pressable>
  );
};
