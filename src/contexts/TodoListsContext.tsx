import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import firestore from '@react-native-firebase/firestore';

const todoListsRef = firestore().collection('TodosLists');

import { Todo } from '../Interfaces';
import { getCurrentUser } from '../services';

interface Person {
  email: string;
}

interface TodoListItem {
  id: string;
  name: string;
  description: string;
  details: string;
  people: Person[];
}

interface TodoListsContext {
  userTodoLists: TodoListItem[];
}

export const TodoListsContext = createContext<TodoListsContext>({
  userTodoLists: [],
});

interface Props {
  children?: ReactNode;
}

export function TodoListsProvider(props: Props) {
  const [todoLists, setTodoLists] = useState<TodoListItem[]>([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const subscription = todoListsRef.onSnapshot((querySnapshot) => {
      const list: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          ...data,
        });
      });

      setTodoLists(list);
    });
    return () => subscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userTodoLists = todoLists.filter((todoList) =>
    todoList.people.some((person) => person.email === currentUser?.email),
  );

  return (
    <TodoListsContext.Provider value={{ userTodoLists }}>
      {props.children}
    </TodoListsContext.Provider>
  );
}
