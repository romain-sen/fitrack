import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--color-primary": "#111111", // Presque noir (texte fort)
    "--color-primary-light": "#333333", // Texte secondaire
    "--color-background": "#FFFFFF", // Fond blanc
    "--color-surface": "#FFFFFF", // Cartes ou éléments flottants
    "--color-text": "#111111", // Texte principal
    "--color-muted": "#888888", // Texte secondaire, désactivé
    "--color-accent": "#FFA500", // Orange principal
    "--color-accent-light": "#FFB733", // Orange plus clair (hover, fond accent)
    "--color-red": "#EF4444", // Rouge principal (ex: stop, delete)
    "--color-red-light": "#FCA5A5", // Rouge clair (hover, fond d’avertissement)
  }),

  dark: vars({
    "--color-primary": "#FFFFFF", // Texte principal
    "--color-primary-light": "#CCCCCC", // Texte secondaire
    "--color-background": "#000000", // Fond noir
    "--color-surface": "#111111", // Surface sombre (cartes)
    "--color-text": "#FFFFFF", // Texte principal
    "--color-muted": "#AAAAAA", // Texte secondaire
    "--color-accent": "#FFA500", // Orange accent (inchangé)
    "--color-accent-light": "#FFB733", // Orange clair
    "--color-red": "#EF4444", // Rouge principal
    "--color-red-light": "#F87171", // Rouge clair adapté au dark mode
  }),
};
