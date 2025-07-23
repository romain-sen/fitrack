import { XStack } from "@/components/ui/XStack";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { parseWorkoutTimeline } from "../../utils/parseWorkoutTimeline";

export const WorkoutSummaryTimeline = () => {
  const steps = useWorkoutStore((s) => s.workoutSteps);
  const currentStepIndex = useWorkoutStore((s) => s.currentStepIndex);
  const scrollViewRef = useRef<ScrollView>(null);

  const timelineSteps = parseWorkoutTimeline(steps, currentStepIndex);

  // Auto-scroll to current step
  useEffect(() => {
    const currentIndex = timelineSteps.findIndex(
      (step) => step.isCurrentExercise || step.isCurrentTransition
    );

    if (currentIndex !== -1 && scrollViewRef.current) {
      // Calculate approximate position (adjust multiplier based on your row heights)
      const estimatedRowHeight = 45; // Approximate height of TimelineRow + TransitionRow
      const scrollToY = Math.max(0, currentIndex * estimatedRowHeight);

      scrollViewRef.current.scrollTo({
        y: scrollToY,
        animated: true,
      });
    }
  }, [currentStepIndex, timelineSteps]);

  return (
    <View className="relative" style={{ maxHeight: 140 }}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          zIndex: 1,
        }}
        pointerEvents="none"
      />
      <ScrollView
        ref={scrollViewRef}
        className="bg-background"
        showsVerticalScrollIndicator={true}
      >
        {/* Leave some space for the top fade */}
        <View className="h-16" />
        {timelineSteps.map((step, index) => (
          <View key={`${step.name}-${index}`}>
            <TimelineRow
              name={step.name}
              duration={step.duration}
              isCurrent={step.isCurrentExercise}
            />
            {index !== timelineSteps.length - 1 && (
              <TransitionRow
                duration={step.transition}
                isCurrent={step.isCurrentTransition}
              />
            )}
          </View>
        ))}
        {/* Leave some space for the bottom fade */}
        <View className="h-16" />
      </ScrollView>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 20,
          zIndex: 1,
        }}
        pointerEvents="none"
      />
    </View>
  );
};

interface TimelineRowProps {
  name: string;
  duration: number;
  isCurrent?: boolean;
}
const TimelineRow = ({
  name,
  duration,
  isCurrent = false,
}: TimelineRowProps) => {
  return (
    <XStack
      className={`justify-between px-md py-xs rounded-md ${
        isCurrent ? "bg-accent-light" : "bg-background"
      }`}
    >
      <Text className="text-text text-xs font-medium">{name}</Text>
      <Text className="text-text text-xs font-mono">
        {formatTimeFromSecondsToMMSS(duration)}
      </Text>
    </XStack>
  );
};

interface TransitionRowProps {
  duration?: number;
  isCurrent?: boolean;
}

const TransitionRow = ({ duration, isCurrent = false }: TransitionRowProps) => (
  <XStack
    className={`justify-between px-md py-xxs rounded-sm ${
      isCurrent ? "bg-accent-light" : "bg-muted/10"
    }`}
  >
    <Text className="text-muted text-xxs italic">Transition</Text>
    <Text className="text-muted text-xxs font-mono italic">
      {duration !== undefined ? formatTimeFromSecondsToMMSS(duration) : "--:--"}
    </Text>
  </XStack>
);
