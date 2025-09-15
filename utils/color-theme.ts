import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--color-primary": "#111111",
    "--color-primary-light": "#333333",
    "--color-background": "#FFFFFF",
    "--color-surface": "#FFFFFF",
    "--color-text": "#111111",
    "--color-muted": "#888888",
    "--color-accent": "#FF8C00",
    "--color-accent-light": "#FF9900", // Darker shade for better contrast
    "--color-red": "#EF4444",
    "--color-red-light": "#FCA5A5",
  }),

  dark: vars({
    "--color-primary": "#FFFFFF",
    "--color-primary-light": "#CCCCCC",
    "--color-background": "#000000",
    "--color-surface": "#111111",
    "--color-text": "#FFFFFF",
    "--color-muted": "#AAAAAA",
    "--color-accent": "#FFA500",
    "--color-accent-light": "#FFB733",
    "--color-red": "#EF4444",
    "--color-red-light": "#F87171",
  }),
};
