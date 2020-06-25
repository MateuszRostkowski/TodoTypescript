import { useContext } from 'react';
import { TodoContext } from '../contexts';

export const useTodoLists = () => useContext(TodoContext);
