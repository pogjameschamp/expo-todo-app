import { useEffect, useState } from "react";
import { View, StyleSheet, Modal, TextInput } from "react-native";
import { Appbar, FAB, Button, Text } from "react-native-paper";
import { useTodoStore } from "@/hooks/useTodoStore";
import TodoList from "@/components/TodoList";
import TodoModal from "@/components/TodoModal";

export default function HomeScreen() {
  const { addTodo, loadTodos } = useTodoStore();
  const [task, setTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // ✅ Load todos from AsyncStorage when the screen loads
  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = (newTask: string) => {
    if (newTask.trim()) {
      addTodo(newTask); // ✅ Add the new task correctly
      setIsAdding(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="To-Do List" />
      </Appbar.Header>

      <View style={styles.listContainer}>
        <TodoList />
      </View>

      <FAB style={styles.fab} icon="plus" size="large" onPress={() => setIsAdding(true)} />

      {/* Full-Screen Modal for Adding Tasks */}
            <TodoModal
              visible={isAdding}
              onClose={() => setIsAdding(false)}
              onSave={handleAddTodo}
              initialText={""}
              title="Enter your next Todo!"
            />
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#322521",
  },
  container: {
    flex: 1,
    backgroundColor: "#322521",
  },
  listContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
    backgroundColor: "#4E3A31",
  },
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
});
