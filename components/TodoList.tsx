import { useTodoStore } from "../hooks/useTodoStore";
import TodoItem from "./TodoItem";
import { FlatList, View, StyleSheet } from "react-native";

export default function TodoList() {
  const { todos } = useTodoStore();

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TodoItem todo={item} />}
      scrollEnabled={todos.length > 5} 
      contentContainerStyle={styles.container} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 80, // FAB & last item don't get cut off
  },
});
