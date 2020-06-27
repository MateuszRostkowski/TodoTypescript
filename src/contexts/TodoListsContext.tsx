import React, { createContext, ReactNode, useState, useEffect } from 'react';
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
  owner: Person;
  people: Person[];
}

interface TodoListsContext {
  userTodoLists: TodoListItem[];
  addPersonToTodoList: (listId: string, email: string) => void;
}

export const TodoListsContext = createContext<TodoListsContext>({
  userTodoLists: [],
  addPersonToTodoList: () => {},
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

  const userTodoLists = todoLists.filter(
    (todoList) =>
      todoList.people.some((person) => person.email === currentUser?.email) ||
      todoList.owner.email === currentUser?.email,
  );

  const addPersonToTodoList = (listId: string, email: string) => {
    const todoList = todoLists.find((list) => list.id === listId);
    const newPeopleInList = [...todoList?.people, { email }];

    todoListsRef.doc(listId).update({ people: newPeopleInList });
  };

  return (
    <TodoListsContext.Provider value={{ userTodoLists, addPersonToTodoList }}>
      {props.children}
    </TodoListsContext.Provider>
  );
}
