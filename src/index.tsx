import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Root, Auth } from './routes';
import { TodoProvider, TodoListsProvider } from './contexts';
import { ThemeProvider } from 'styled-components';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const App = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(newUser: FirebaseAuthTypes.User | null) {
    setUser(newUser);
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={{}}>
        <TodoListsProvider>
          <TodoProvider>{user !== null ? <Root /> : <Auth />}</TodoProvider>
        </TodoListsProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
