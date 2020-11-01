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
import { useAuth } from '../hooks';

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
  currentTodoListId: string;
  setCurrentTodoListId: Dispatch<SetStateAction<string>>;
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
  currentTodoListId: '',
  setCurrentTodoListId: () => {},
});

interface Props {
  children?: ReactNode;
}

export function TodoProvider(props: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodoListId, setCurrentTodoListId] = useState('Todos');
  const [activeFilter, setActiveFilter] = useState<ActiveFilterState>('all');
  const todosRef = firestore().collection(currentTodoListId);
  const { user } = useAuth();

  useEffect(() => {
    const subscription = todosRef.onSnapshot((querySnapshot) => {
      const list: Todo[] = [];
      querySnapshot?.forEach((doc) => {
        const { name, date, done, user: userName } = doc.data();
        list.push({
          id: doc.id,
          user: userName,
          name,
          date,
          done,
        });
      });

      setTodos(list);
    });
    return () => subscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTodoListId]);

  const isAllDone =
    todos.length === 0 ? false : todos.every((todo) => todo.done);

  const todosToDisplay = todos
    .sort((a, b) => {
      return b?.date?.toDate() - a?.date?.toDate();
    })
    .filter((todo) => {
      if (activeFilter === 'done') {
        return todo.done;
      } else if (activeFilter === 'active') {
        return !todo.done;
      } else {
        return true;
      }
    });

  const todoRef = (itemId: string) => todosRef.doc(itemId);

  const addItem = async (itemName: string) => {
    const newTodo = {
      user: user?.displayName ?? "Can't find user name",
      name: itemName,
      date: new Date(),
      done: false,
    };
    await todosRef.add(newTodo);
  };

  const deleteItem = async (itemId: string) => {
    await todoRef(itemId).delete();
  };

  const toggleDoneItem = async (itemId: string) => {
    const todoDone = todos.find((todo) => todo.id === itemId)?.done || false;
    await todoRef(itemId).update({ done: !todoDone });
  };

  const editItem = async (newItemName: string, itemId: string) => {
    await todoRef(itemId).update({ name: newItemName });
  };

  const toggleAllTodos = async () => {
    await todos.forEach((todo) => {
      todoRef(todo.id).update({ done: !isAllDone });
    });
  };

  const deleteDone = async () => {
    const newTodos = todos.filter((todo) => todo.done);
    await newTodos.forEach((todo) => todoRef(todo.id).delete());
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
        currentTodoListId,
        setCurrentTodoListId,
      }}>
      {props.children}
    </TodoContext.Provider>
  );
}
