import { useContext } from 'react';
import { TodoListsContext } from '../contexts';

export const useTodoLists = () => useContext(TodoListsContext);
