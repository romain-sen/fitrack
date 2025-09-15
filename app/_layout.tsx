import { Header } from "@/components/layout/Header";
import { HeaderHomePage } from "@/components/layout/HeaderHomePage";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ header: () => <HeaderHomePage /> }}
        />
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
        <Stack.Screen
          name="murph"
          options={{
            headerShown: true,
            headerTitle: "Murph",
            header: () => <HeaderHomePage />,
          }}
        />
        <Stack.Screen
          name="freeWorkout"
          options={{
            headerShown: true,
            headerTitle: "Free Workout",
            header: () => <HeaderHomePage />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
