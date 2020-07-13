import React, { createContext, ReactNode, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import { deleteTodoList } from '../services';
import { TodoListItem } from '../Interfaces';

const todoListsRef = firestore().collection('TodosLists');

import { useAuth } from '../hooks';

interface TodoListsContext {
  userTodoLists: TodoListItem[];
  addPersonToTodoList: (listId: string, email: string) => void;
  removePersonFromTodoList: (listId: string, email: string) => void;
  deleteList: (listId: string) => void;
}

export const TodoListsContext = createContext<TodoListsContext>({
  userTodoLists: [],
  addPersonToTodoList: () => {},
  removePersonFromTodoList: () => {},
  deleteList: () => {},
});

interface Props {
  children?: ReactNode;
}

export function TodoListsProvider(props: Props) {
  const [todoLists, setTodoLists] = useState<TodoListItem[]>([]);
  const { user } = useAuth();

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
      todoList.people.some((person) => person.email === user?.email) ||
      todoList.owner.email === user?.email,
  );

  const addPersonToTodoList = (listId: string, email: string) => {
    try {
      const todoList = todoLists.find((list) => list.id === listId);
      const newPeopleInList = [...todoList?.people, { email }];

      todoListsRef.doc(listId).update({ people: newPeopleInList });
      showMessage({
        message: `${email} user email added to list`,
        icon: 'success',
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: 'Error while adding user to list',
        icon: 'danger',
        type: 'danger',
      });
    }
  };

  const removePersonFromTodoList = async (listId: string, email: string) => {
    try {
      const todoList = todoLists.find((list) => list.id === listId);
      const newPeopleInList = todoList?.people.filter(
        (person) => person.email !== email,
      );

      await todoListsRef.doc(listId).update({ people: newPeopleInList });

      showMessage({
        message: `${email} user email removed from list`,
        icon: 'success',
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: 'Error while removing user to list',
        icon: 'danger',
        type: 'danger',
      });
    }
  };

  const deleteList = async (listId: string) => {
    try {
      await deleteTodoList(listId);
      showMessage({
        message: 'Successfully deleted your list',
        icon: 'success',
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: 'Error while deleting your list',
        icon: 'danger',
        type: 'danger',
      });
    }
  };

  return (
    <TodoListsContext.Provider
      value={{
        userTodoLists,
        addPersonToTodoList,
        removePersonFromTodoList,
        deleteList,
      }}>
      {props.children}
    </TodoListsContext.Provider>
  );
}
