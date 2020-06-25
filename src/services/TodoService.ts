import firestore from '@react-native-firebase/firestore';
import { getCurrentUser } from './AuthService';

const todoListsRef = firestore().collection('TodosLists');

export const createTodoList = async (name: string) => {
  const currenUser = getCurrentUser();
  await todoListsRef.add({
    name,
    people: [{ email: currenUser?.email || '' }],
  });
};

export const deleteTodoList = async (id: string) => {
  await todoListsRef.doc(id).delete();
};

export const updateTodoList = async (id: string, name: string) => {
  await todoListsRef.doc(id).update({ name });
};
