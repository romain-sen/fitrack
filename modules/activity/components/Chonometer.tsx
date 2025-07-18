import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

interface ChronometerProps {
  timeInSeconds: number;
  setTimeInSeconds: (timeInSeconds: number) => void;
  running: boolean;
}

export const Chronometer = ({
  timeInSeconds,
  setTimeInSeconds,
  running,
}: ChronometerProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Manage the timer interval depending on running prop
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeInSeconds((prev) => prev + 1);
      }, 1000) as unknown as NodeJS.Timeout;
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return (
    <View className="items-center">
      <Text className="text-4xl font-mono text-text">
        {formatTime(timeInSeconds)}
      </Text>
    </View>
  );
};
