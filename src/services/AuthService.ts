import auth from '@react-native-firebase/auth';

export const updateUserName = async (displayName: string) => {
  await auth().currentUser?.updateProfile({ displayName });
};

export const signIn = async (login: string, password: string) => {
  await auth().signInWithEmailAndPassword(login, password);
};

export const registerUser = async (
  login: string,
  password: string,
  name: string,
) => {
  await auth().createUserWithEmailAndPassword(login, password);
  if (name) {
    updateUserName(name);
  }
};

export const logout = async () => {
  await auth().signOut();
};
