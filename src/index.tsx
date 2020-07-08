import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Root, Auth } from './routes';
import { TodoProvider, TodoListsProvider, AuthProvider } from './contexts';
import { ThemeProvider } from 'styled-components';
import { useAuth } from './hooks';

const AppStack = () => {
  const { user } = useAuth();

  return user !== null ? <Root /> : <Auth />;
};

export const App = () => (
  <NavigationContainer>
    <ThemeProvider theme={{}}>
      <AuthProvider>
        <TodoListsProvider>
          <TodoProvider>
            <AppStack />
          </TodoProvider>
        </TodoListsProvider>
      </AuthProvider>
    </ThemeProvider>
  </NavigationContainer>
);
