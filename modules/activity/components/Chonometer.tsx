import React, { useEffect, useRef, useState } from "react";
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
  running: boolean;
  resetTrigger?: number; // increment this prop to trigger reset
}

export const Chronometer = ({ running, resetTrigger }: ChronometerProps) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset timer when resetTrigger changes
  useEffect(() => {
    setSeconds(0);
  }, [resetTrigger]);

  // Manage the timer interval depending on running prop
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
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
        {formatTime(seconds)}
      </Text>
    </View>
  );
};
