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
          options={{
            header: () => <HeaderHomePage />,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="activity"
          options={{
            headerShown: true,
            headerTitle: "Activity",
            header: () => <Header showModalOnBackPress />,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="previousScore"
          options={{
            headerShown: true,
            headerTitle: "Previous Score",
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="murph/index"
          options={{
            headerShown: true,
            headerTitle: "Murph",
            header: () => <HeaderHomePage />,
          }}
        />
        <Stack.Screen
          name="murph/goalCalculator"
          options={{
            headerShown: true,
            headerTitle: "Murph Goal Calculator",
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="freeWorkout"
          options={{
            headerShown: true,
            headerTitle: "Free Workout",
            header: () => <HeaderHomePage />,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="workout-result/murphWorkoutResult"
          options={{
            headerShown: false,
            headerTitle: "Murph Workout Result",
            header: () => <HeaderHomePage />,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="workout-result/freeWorkoutResult"
          options={{
            headerShown: false,
            headerTitle: "Free Workout Result",
            header: () => <HeaderHomePage />,
            gestureEnabled: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
