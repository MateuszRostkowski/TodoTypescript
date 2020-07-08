import firestore from '@react-native-firebase/firestore';

const todoListsRef = firestore().collection('TodosLists');

export const createTodoList = async (
  name: string,
  description: string,
  details: string,
  userEmail: string,
) => {
  await todoListsRef.add({
    name,
    description,
    details,
    owner: { email: userEmail },
    people: [],
  });
};

export const deleteTodoList = async (id: string) => {
  await todoListsRef.doc(id).delete();
};

export const updateTodoList = async (id: string, name: string) => {
  await todoListsRef.doc(id).update({ name });
};
