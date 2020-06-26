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
  const { currentTodoList } = useTodos();
  const { userTodoLists } = useTodoLists();
  const { name } =
    userTodoLists.find((list) => list.id === currentTodoList) || 'Todos';
  useTitle(name);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Touchable m="10px" onPress={() => navigation.navigate('TodoSettings')}>
          <Text>Edit</Text>
        </Touchable>
      ),
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
