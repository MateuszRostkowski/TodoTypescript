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
import { useTitle, useTodos, useTodoLists } from '../hooks';

export const TodoScreen = ({ navigation }) => {
  const { currentTodoListId } = useTodos();
  const { userTodoLists } = useTodoLists();
  const { name } =
    userTodoLists.find((list) => list.id === currentTodoListId) || 'Todos';
  useTitle(name);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        currentTodoListId !== 'Todos' ? (
          <Touchable
            m="15px"
            onPress={() => navigation.navigate('TodoSettings')}>
            <Text style={styles.todoListEditHeader}>Edit</Text>
          </Touchable>
        ) : null,
    });
  }, [navigation]);

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
