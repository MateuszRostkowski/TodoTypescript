import { useContext } from 'react';
import { TodoListsContext } from '../contexts';

export const useTodoLists = () => useContext(TodoListsContext);

export const useCurrentTodoList = (id: string) => {
  const { userTodoLists } = useTodoLists();
  return userTodoLists.find((todoList) => todoList.id === id);
};
