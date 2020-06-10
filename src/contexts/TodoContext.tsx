import React, {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Todo } from '../Interfaces';

const TODOS_KEY = 'TODOS_KEY';

interface TodoContext {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  addItem: (itemName: string) => void;
  deleteItem: (itemId: string) => void;
  editItem: (newItemName: string, itemId: string) => void;
  toggleDoneItem: (_itemId: string) => void;
}

export const TodoContext = createContext<TodoContext>({
  todos: [],
  setTodos: (_value: React.SetStateAction<Todo[]>) => {},
  addItem: (_itemName: string) => {},
  deleteItem: (_itemId: string) => {},
  editItem: (_newItemName: string, _itemId: string) => {},
  toggleDoneItem: (_itemId: string) => {},
});

interface Props {
  children?: ReactNode;
}

export function TodoProvider(props: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c,
    ) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // TODO: uncomment when app finished
  useEffect(() => {
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (todos !== null) {
      setItem(todos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const getItem = useCallback(async () => {
    const rawValue = await AsyncStorage.getItem(TODOS_KEY);
    const value = JSON.parse(rawValue) || [];
    const newTodos = value.map((todo: Todo) => {
      const newTodo = {
        ...todo,
        date: new Date(todo.date),
      };
      return newTodo;
    });
    setTodos(newTodos);
  }, []);

  const setItem = useCallback(async (value) => {
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(value));
  }, []);

  const addItem = (itemName: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      name: itemName,
      date: new Date(),
      done: false,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  };

  const deleteItem = (itemId: string) => {
    const newTodos = todos.filter((todo: Todo) => todo.id !== itemId);
    setTodos(newTodos);
  };

  const toggleDoneItem = (itemId: string) => {
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === itemId) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const editItem = (newItemName: string, itemId: string) => {
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === itemId) {
        return {
          ...todo,
          name: newItemName,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addItem,
        deleteItem,
        editItem,
        toggleDoneItem,
      }}>
      {props.children}
    </TodoContext.Provider>
  );
}
