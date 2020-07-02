import React, { createContext, ReactNode } from 'react';

interface AuthContext {}

export const AuthContext = createContext<AuthContext>({});

interface Props {
  children?: ReactNode;
}

export function AuthProvider(props: Props) {
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
}
