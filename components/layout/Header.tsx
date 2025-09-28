import { XStack } from "@/components/ui/XStack";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  showModalOnBackPress?: boolean;
}

export const Header = ({ showModalOnBackPress = false }: HeaderProps) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (showModalOnBackPress) {
      setModalVisible(true);
    } else {
      navigation.goBack();
    }
  };

  const confirmExit = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const cancelExit = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View
        className="bg-background px-4 pb-2 pt-safe"
        style={{ paddingTop: insets.top }}
      >
        <TouchableOpacity
          onPress={handleBackPress}
          className="w-10 h-10 rounded-full justify-center items-center"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colorScheme === "dark" ? "#fff" : "#111"}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelExit}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={cancelExit}
          className="flex-1 bg-black/50 justify-center items-center"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            className="bg-surface rounded-xl p-6 m-5 min-w-[280px] shadow-lg"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <XStack className="flex-col items-center space-y-4">
              <Text className="text-lg font-semibold text-center text-text">
                Leave Activity?
              </Text>
              <Text className="text-sm text-center text-muted">
                Are you sure you want to leave? Your progress will be lost.
              </Text>

              <XStack className="gap-lg mt-4">
                <TouchableOpacity
                  onPress={cancelExit}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-transparent"
                >
                  <Text className="text-center text-text font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={confirmExit}
                  className="flex-1 px-4 py-3 rounded-lg bg-red"
                >
                  <Text className="text-center text-white font-medium">
                    Leave
                  </Text>
                </TouchableOpacity>
              </XStack>
            </XStack>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
