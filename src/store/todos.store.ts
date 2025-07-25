import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ITodo } from "~/types";
import { todos as initialTodos } from "~/data/mock-data";

interface ITodoStoreState {
  todos: ITodo[];
}

interface ITodoStoreActions {
  checkTodo: (id: string) => void;
}

type ITodoStore = ITodoStoreState & ITodoStoreActions;

export const useTodosStore = create<ITodoStore>()(
  persist(
    (set) => ({
      todos: initialTodos,
      checkTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },
    }),
    {
      name: "todos-store",
    }
  )
);
