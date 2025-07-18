import { XStack } from "@/components/ui/XStack";
import { YStack } from "@/components/ui/YStack";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Modal, Text, TouchableOpacity } from "react-native";

export const ActivityHeader = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleBackPress = () => {
    setModalVisible(true);
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
      <Header
        title="Activity"
        headerLeft={() => (
          <TouchableOpacity onPress={handleBackPress} className="px-3 py-2">
            <Ionicons name="arrow-back" size={24} color="var(--color-text)" />
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
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
            className="bg-background rounded-xl p-6 m-5 min-w-[280px] shadow-lg"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <YStack className="items-center space-y-4">
              <Text className="text-lg font-semibold text-center text-foreground">
                Leave Activity?
              </Text>
              <Text className="text-sm text-center text-muted-foreground">
                Are you sure you want to leave? Your progress will be lost.
              </Text>

              <XStack className="gap-lg mt-4">
                <TouchableOpacity
                  onPress={cancelExit}
                  className="flex-1 px-4 py-3 rounded-lg border border-border"
                >
                  <Text className="text-center text-foreground font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={confirmExit}
                  className="flex-1 px-4 py-3 rounded-lg bg-red-500"
                >
                  <Text className="text-center text-white font-medium">
                    Leave
                  </Text>
                </TouchableOpacity>
              </XStack>
            </YStack>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
