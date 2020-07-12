import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Root, Auth } from './routes';
import { TodoProvider, TodoListsProvider, AuthProvider } from './contexts';
import { ThemeProvider } from 'styled-components';
import { useAuth } from './hooks';
import FlashMessage from 'react-native-flash-message';

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
            <FlashMessage position="top" />
          </TodoProvider>
        </TodoListsProvider>
      </AuthProvider>
    </ThemeProvider>
  </NavigationContainer>
);
