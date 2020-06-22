import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

const screenWidth = Dimensions.get('window').width;

import { TodoItem } from './TodoItem';
import { useTodos } from '../hooks/useTodos';

export const TodosList: React.FC = () => {
  const { todos } = useTodos();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} item={todo} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },
});
