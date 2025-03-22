import { useTodoStore } from "../hooks/useTodoStore";
import TodoItem from "./TodoItem";
import { FlatList, View, StyleSheet, Text } from "react-native";

export default function TodoList() {
  const { todos } = useTodoStore();

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TodoItem todo={item} />}
      scrollEnabled={todos.length > 5}
      contentContainerStyle={[
        styles.container,
        todos.length === 0 && styles.centerContent, // Center empty message
      ]}
      ListEmptyComponent={
        <Text style={styles.emptyText}>You have no todos today</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 80,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#ddd",
    fontStyle: "italic",
  },
});
