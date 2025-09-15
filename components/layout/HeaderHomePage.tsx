import { useRouter } from "expo-router";
import { SFSymbol, SymbolView } from "expo-symbols";
import { useTheme } from "providers/ThemeProvider";
import { Text, TouchableOpacity, View } from "react-native";
import ThemeToggle from "../ThemeToggle";
import { XStack } from "../ui/XStack";

interface HeaderHomePageProps {
  backButtonToShow?: "back" | "home";
}

export const HeaderHomePage = ({
  backButtonToShow = "back",
}: HeaderHomePageProps) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (backButtonToShow === "back") {
      router.back();
    } else if (backButtonToShow === "home") {
      router.dismissTo("/");
    }
  };

  return (
    <View className="bg-background justify-between pl-xl pr-3xl pt-safe gap-2xl">
      {/* Header */}
      <View className="mb-2xl flex-row justify-between items-center">
        <XStack className="gap-md">
          {backButtonToShow === "back" && (
            <ActionButton onPress={handleBackPress} icon="arrow.left" />
          )}
          {backButtonToShow === "home" && (
            <ActionButton onPress={handleBackPress} icon="house" />
          )}
          <Text
            onPress={handleBackPress}
            className="text-4xl font-bold text-accent font-system shadow-black"
          >
            Fitrack
          </Text>
        </XStack>
        <ThemeToggle />
      </View>
    </View>
  );
};

const ActionButton = ({
  onPress,
  icon,
}: {
  onPress: () => void;
  icon: SFSymbol;
}) => {
  const { theme } = useTheme();
  const accentColor = theme === "dark" ? "#FFA500" : "#FF8C00";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-10 h-10 rounded-full justify-center items-center"
    >
      <SymbolView name={icon} size={30} tintColor={accentColor} />
    </TouchableOpacity>
  );
};
