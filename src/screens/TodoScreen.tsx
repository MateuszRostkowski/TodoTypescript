import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TodoInput, TodosList, Controlls } from '../components';
import { useTitle, useTodos, useTodoLists } from '../hooks';

export const TodoScreen = () => {
  const { currentTodoList } = useTodos();
  const { userTodoLists } = useTodoLists();
  const { name } =
    userTodoLists.find((list) => list.id === currentTodoList) || 'Todos';
  useTitle(name);
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
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
