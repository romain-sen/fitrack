import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="activity"
          options={{
            headerShown: true,
            headerTitle: "Activity",
            header: () => <Header showModalOnBackPress />,
          }}
        />
        <Stack.Screen name="workoutResult" options={{ headerShown: false }} />
        <Stack.Screen
          name="previousScore"
          options={{
            headerShown: true,
            headerTitle: "Previous Score",
            header: () => <Header />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
