import React from "react";
import { Pressable, PressableProps, Text } from "react-native";
import { tv } from "tailwind-variants";

const button = tv({
  base: "items-center justify-center shadow-md active:opacity-80",
  variants: {
    variant: {
      default: "bg-accent",
      outline: "border border-accent bg-transparent",
      ghost: "bg-transparent",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    square: {
      true: "p-md", // equal padding for square shape
      false: "", // we'll apply px/py based on size
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-xl",
      full: "rounded-full",
    },
    disabled: {
      true: "opacity-50",
    },
  },
  compoundVariants: [
    {
      square: false,
      size: "sm",
      class: "px-xl py-xs",
    },
    {
      square: false,
      size: "md",
      class: "px-3xl py-sm",
    },
    {
      square: false,
      size: "lg",
      class: "px-4xl py-md",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    square: false,
    rounded: "lg",
  },
});

interface CTAButtonProps extends PressableProps {
  title: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  square?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  onPress,
  variant,
  size,
  disabled,
  square,
  rounded,
  ...props
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255, 183, 51, 0.2)" }}
      disabled={disabled}
      className={button({
        variant,
        size,
        disabled: disabled ?? false,
        square,
        rounded,
      })}
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
