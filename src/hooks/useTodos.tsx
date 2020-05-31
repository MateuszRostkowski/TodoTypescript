import { useContext } from 'react';
import { TodoContext } from '../contexts';

export const useTodos = () => useContext(TodoContext);
