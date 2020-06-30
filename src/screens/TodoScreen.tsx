import React, { useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { TodoInput, TodosList, Controlls, Touchable } from '../components';
import { useTitle, useTodos, useTodoLists, useCurrentTodoList } from '../hooks';
import { getCurrentUser } from '../services';

export const TodoScreen = ({ navigation }) => {
  const { currentTodoListId } = useTodos();
  const { userTodoLists } = useTodoLists();
  const currentUser = getCurrentUser();
  const todoList = useCurrentTodoList(currentTodoListId);
  const isPersonOwner = todoList?.owner.email === currentUser?.email;
  const { name } = userTodoLists.find(
    (list) => list.id === currentTodoListId,
  ) || { name: 'Todos' };
  useTitle(name);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        currentTodoListId !== 'Todos' ? (
          <Touchable
            m="15px"
            onPress={() => navigation.navigate('TodoSettings')}>
            <Text style={styles.todoListEditHeader}>
              {isPersonOwner ? 'Edit' : 'Details'}
            </Text>
          </Touchable>
        ) : null,
    });
  }, [navigation, currentTodoListId, isPersonOwner]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}>
        <View style={styles.container}>
          <TodosList />
          <Controlls />
          <TodoInput />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  todoListEditHeader: {
    color: '#06f',
    fontSize: 15,
  },
  editContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
