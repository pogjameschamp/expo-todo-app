import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text } from "react-native-paper";

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialText?: string;
  title: string;
}

export default function TodoModal({
  visible,
  onClose,
  onSave,
  initialText = "",
  title,
}: TodoModalProps) {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText); // ✅ Reset text when opening modal
  }, [visible, initialText]);

  const handleSave = () => {
    Keyboard.dismiss();
    if (text.trim()) {
      onSave(text);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Enter task..."
            placeholderTextColor="black"
          />
          <View style={styles.modalButtons}>
            <Button
              style={styles.modalButton}
              mode="contained"
              textColor="white"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              style={styles.modalButton}
              mode="contained"
              textColor="white"
              onPress={handleSave}
            >
              Save
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#7f4f24",
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 20,
    color: "black",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#a98467",
  },
});
