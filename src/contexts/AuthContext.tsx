import React, { createContext, ReactNode, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContext {
  user: FirebaseAuthTypes.User | null;
  updateUserName: (displayName: string) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  updateUserName: () => {},
});

interface Props {
  children?: ReactNode;
}

export function AuthProvider(props: Props) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(newUser: FirebaseAuthTypes.User | null) {
    setUser(newUser);
  }

  const updateUserName = async (displayName: string) => {
    await auth().currentUser?.updateProfile({ displayName });
    const newUser = await auth().currentUser;
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, updateUserName }}>
      {props.children}
    </AuthContext.Provider>
  );
}
