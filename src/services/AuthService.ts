import auth from '@react-native-firebase/auth';

export const signIn = async (login: string, password: string) => {
  await auth().signInWithEmailAndPassword(login, password);
};

export const registerUser = async (
  login: string,
  password: string,
  name: string,
) => {
  await auth().createUserWithEmailAndPassword(login, password);
  await auth().currentUser?.updateProfile({ displayName: name });
};
