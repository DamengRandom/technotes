### React ZuStand

It is a library to manage React state(s) ~~

#### Code example:

```js
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Zustand trial now
type Store = {
  todos: Todo[],
  newTodo: string,
  addTodo: () => void,
  setNewTodo: (text: string) => void,
  read: (todos: Todo[]) => void,
  update: (id: number, text: string) => void,
  toggle: (id: number) => void,
  remove: (id: number) => void,
};

let settingsStore: any = (set: any) => ({
  todos: [],
  newTodo: "",
  read(todos: Todo[]) {
    set((state: any) => ({
      ...state,
      todos,
    }));
  },
  addTodo() {
    set((state: any) => ({
      ...state,
      todos: addTodo(state.todos, state.newTodo),
      newTodo: "",
    }));
  },
  setNewTodo(text: string) {
    set((state: any) => ({
      ...state,
      newTodo: text,
    }));
  },
  update(id: number, text: string) {
    set((state: any) => ({
      ...state,
      todos: updateTodo(state.todos, id, text),
    }));
  },
  toggle(id: number) {
    set((state: any) => ({
      ...state,
      todos: toggleTodo(state.todos, id),
    }));
  },
  remove(id: number) {
    set((state: any) => ({
      ...state,
      todos: removeTodo(state.todos, id),
    }));
  },
});

settingsStore = devtools(settingsStore);
settingsStore = persist(settingsStore);

const useStore = create < Store > settingsStore;

export default useStore;

// create multiple zustand store instances:
// https://stackoverflow.com/questions/71679066/how-to-create-multiple-instances-of-a-zustand-store#:~:text=You%20can%20create%20multiple%20stories,with%20different%20name%20of%20store.
```
