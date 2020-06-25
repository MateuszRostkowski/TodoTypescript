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

interface TodoListsContext {}

export const TodoListsContext = createContext<TodoListsContext>({});

interface Props {
  children?: ReactNode;
}

export function TodoListsProvider(props: Props) {
  return (
    <TodoListsContext.Provider value={{}}>
      {props.children}
    </TodoListsContext.Provider>
  );
}
