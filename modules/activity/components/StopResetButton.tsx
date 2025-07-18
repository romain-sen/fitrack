import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const ICON_SIZE = 12;

interface StopResetButtonProps {
  onPress: () => void;
}

export const StopResetButton = ({ onPress }: StopResetButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-${ICON_SIZE} h-${ICON_SIZE} bg-red rounded-full justify-center items-center shadow-lg`}
    >
      <Ionicons name="square" size={ICON_SIZE * 1.5} color="white" />
    </TouchableOpacity>
  );
};
