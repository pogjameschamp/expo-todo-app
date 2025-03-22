import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useTodoStore, Todo } from "../hooks/useTodoStore";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoModal from "./TodoModal"; // ✅ Import the modal component

export default function TodoItem({ todo }: { todo: Todo }) {
  const { removeTodo, editTodo } = useTodoStore();
  const [isSwiped, setIsSwiped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = (text: string) => {
    editTodo(todo.id, text);
    setIsEditing(false);
  };

  return (
    <>
      <SwipeListView
        data={[todo]} // ✅ Must be an array
        keyExtractor={(item) => item.id.toString()} // ✅ Required unique key
        onRowOpen={() => setIsSwiped(true)}
        onRowClose={() => setIsSwiped(false)}

        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.listView}
            underlayColor="#936639"
            activeOpacity={1}
            onPress={() => setIsEditing(true)} // ✅ Open Modal on Press
          >
            <View>
              <Text style={isSwiped ? styles.swipedTodoText : styles.todoText}>
                {item.text}
              </Text>
              <Text style={styles.todoDate}>{item.dateCreated}</Text>
            </View>
          </TouchableHighlight>
        )}

        renderHiddenItem={({ item }) => (
          <View style={styles.listViewHidden}>
            <TouchableOpacity
              onPress={() => removeTodo(item.id)}
              style={styles.hiddenButton}
            >
              <IconButton icon="delete" iconColor="white" size={24} />
            </TouchableOpacity>
          </View>
        )}

        leftOpenValue={75}
      />

      {/* ✅ Full-Screen Modal for Editing Todos */}
      <TodoModal
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleEdit}
        initialText={newText}
        title="Edit Task"
      />
    </>
  );
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: "#936639",
    minHeight: 85,
    width: "100%",
    padding: 15,
    justifyContent: "space-between", // ✅ Space items
    marginBottom: 15,
    borderRadius: 10,
  },
  todoText: {
    fontSize: 16,
    letterSpacing: 1,
    color: "#E6E6E6",
  },
  swipedTodoText: {
    fontSize: 16,
    letterSpacing: 1,
    color: "#b6ad90",
    fontStyle: "italic",
    textDecorationLine: "line-through",
  },
  listViewHidden: {
    backgroundColor: "#b6ad90",
    minHeight: 85,
    width: "100%",
    padding: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 15,
    borderRadius: 11,
  },
  hiddenButton: {
    width: 55,
    alignItems: "center",
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
    borderRadius: 10,
  },
  todoDate: {
    fontSize: 10,
    letterSpacing: 1,
    color: "#b6ad90", // ✅ Match design
    textAlign: "right",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
