import React, { useEffect, useState } from 'react';
import { Root, Auth } from './routes';
import { TodoProvider } from './contexts';
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

  if (!user) {
    return <Auth />;
  }

  return (
    <TodoProvider>
      <Root />
    </TodoProvider>
  );
};
