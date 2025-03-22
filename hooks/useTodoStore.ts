import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type Todo = {
  id: number;
  text: string;
  dateCreated: string; // ✅ Added Date Property
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  editTodo: (id: number, newText: string) => void;
  removeTodo: (id: number) => void;
  loadTodos: () => Promise<void>; // ✅ Load from AsyncStorage
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: async (text) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      dateCreated: new Date().toLocaleString(), // ✅ Store Date & Time
    };

    set((state) => {
      const updatedTodos = [...state.todos, newTodo];
      AsyncStorage.setItem("todos", JSON.stringify(updatedTodos)); // ✅ Persist data
      return { todos: updatedTodos };
    });
  },

  editTodo: async (id, newText) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  removeTodo: async (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  loadTodos: async () => {
    const storedTodos = await AsyncStorage.getItem("todos");
    if (storedTodos) {
      set({ todos: JSON.parse(storedTodos) });
    }
  },
}));
