import React, { useEffect, useState } from 'react';
import { Root, Auth } from './routes';
import { TodoProvider } from './contexts';
import auth from '@react-native-firebase/auth';

export const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
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
