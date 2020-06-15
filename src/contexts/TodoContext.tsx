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

type ActiveFilterState = 'all' | 'done' | 'active';

interface TodoContext {
  activeFilter: ActiveFilterState;
  addItem: (itemName: string) => void;
  deleteDone: () => void;
  deleteItem: (itemId: string) => void;
  editItem: (newItemName: string, itemId: string) => void;
  isAllDone: boolean;
  setActiveFilter: Dispatch<SetStateAction<ActiveFilterState>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
  toggleAllTodos: () => void;
  toggleDoneItem: (_itemId: string) => void;
}

export const TodoContext = createContext<TodoContext>({
  activeFilter: 'all',
  addItem: (_itemName: string) => {},
  deleteDone: () => {},
  deleteItem: (_itemId: string) => {},
  editItem: (_newItemName: string, _itemId: string) => {},
  isAllDone: false,
  setActiveFilter: () => {},
  setTodos: (_value: React.SetStateAction<Todo[]>) => {},
  todos: [],
  toggleAllTodos: () => {},
  toggleDoneItem: (_itemId: string) => {},
});

interface Props {
  children?: ReactNode;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function TodoProvider(props: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<ActiveFilterState>('all');

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

  const isAllDone =
    todos.length === 0 ? false : todos.every((todo) => todo.done);

  const todosToDisplay = todos.filter((todo) => {
    if (activeFilter === 'done') {
      return todo.done;
    } else if (activeFilter === 'active') {
      return !todo.done;
    } else {
      return true;
    }
  });

  const getItem = useCallback(async () => {
    const rawValue = (await AsyncStorage.getItem(TODOS_KEY)) || '';
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
    const newTodos = todos.map((todo) => {
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

  const toggleAllTodos = () => {
    const newTodos = todos.map((todo) => {
      return {
        ...todo,
        done: !isAllDone,
      };
    });
    setTodos(newTodos);
  };

  const deleteDone = () => {
    const newTodos = todos.filter((todo) => {
      return !todo.done;
    });

    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        activeFilter,
        addItem,
        deleteDone,
        deleteItem,
        editItem,
        isAllDone,
        setActiveFilter,
        setTodos,
        todos: todosToDisplay,
        toggleAllTodos,
        toggleDoneItem,
      }}>
      {props.children}
    </TodoContext.Provider>
  );
}
