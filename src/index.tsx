import React from 'react';
import { Root } from './routes';
import { TodoProvider } from './contexts';

export const App = () => {
  return (
    <TodoProvider>
      <Root />
    </TodoProvider>
  );
};
