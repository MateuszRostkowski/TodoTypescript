import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import firestore from '@react-native-firebase/firestore';

import { Todo } from '../Interfaces';

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

export function TodoProvider(props: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<ActiveFilterState>('all');
  const todosRef = firestore().collection('Todos');

  useEffect(() => {
    const subscription = todosRef.onSnapshot((querySnapshot) => {
      const list: Todo[] = [];
      querySnapshot.forEach((doc) => {
        const { name, date, done } = doc.data();
        list.push({
          id: doc.id,
          name,
          date,
          done,
        });
      });

      setTodos(list);
    });
    return () => subscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const addItem = async (itemName: string) => {
    const newTodo = {
      name: itemName,
      date: new Date(),
      done: false,
    };
    await todosRef.add(newTodo);
  };

  const deleteItem = async (itemId: string) => {
    await todosRef.doc(itemId).delete();
  };

  const toggleDoneItem = async (itemId: string) => {
    const todoDone = todos.find((todo) => todo.id === itemId)?.done || false;
    await todosRef.doc(itemId).update({ done: !todoDone });
  };

  const editItem = async (newItemName: string, itemId: string) => {
    await todosRef.doc(itemId).update({ name: newItemName });
  };

  const toggleAllTodos = async () => {
    await todos.forEach((todo) => {
      todosRef.doc(todo.id).update({ done: !isAllDone });
    });
  };

  const deleteDone = async () => {
    const newTodos = todos.filter((todo) => {
      return todo.done;
    });

    await newTodos.forEach((todo) => todosRef.doc(todo.id).delete());
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
