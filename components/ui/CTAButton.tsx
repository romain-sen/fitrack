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
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
    },
    square: {
      true: "aspect-square", // makes the button square (equal width and height)
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
      class: "px-xl py-sm",
    },
    {
      square: false,
      size: "lg",
      class: "px-4xl py-md",
    },
    {
      square: false,
      size: "xl",
      class: "px-5xl py-lg",
    },
    {
      square: false,
      size: "2xl",
      class: "px-6xl py-xl",
    },
    {
      square: true,
      size: "sm",
      class: "p-xs",
    },
    {
      square: true,
      size: "md",
      class: "p-sm",
    },
    {
      square: true,
      size: "lg",
      class: "p-md",
    },
    {
      square: true,
      size: "xl",
      class: "p-lg",
    },
    {
      square: true,
      size: "2xl",
      class: "p-lg",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    square: false,
    rounded: "lg",
  },
});

// Helper function to get text size based on button size
const getTextSize = (size: "sm" | "md" | "lg" | "xl" | "2xl"): string => {
  switch (size) {
    case "sm":
      return "text-sm";
    case "md":
      return "text-base";
    case "lg":
      return "text-lg";
    case "xl":
      return "text-xl";
    case "2xl":
      return "text-2xl";
    default:
      return "text-base";
  }
};

interface CTAButtonProps extends PressableProps {
  title: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  square?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  hitSlop?: number;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  onPress,
  variant,
  size = "xl",
  disabled,
  square,
  rounded,
  hitSlop,
  ...props
}) => {
  const textSize = getTextSize(size);

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255, 183, 51, 0.2)" }}
      disabled={disabled}
      hitSlop={hitSlop}
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
        className={`${
          variant === "outline" || variant === "ghost"
            ? "text-accent font-semibold"
            : "text-background font-semibold"
        } ${textSize} -mt-0.5`}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        {title}
      </Text>
    </Pressable>
  );
};
