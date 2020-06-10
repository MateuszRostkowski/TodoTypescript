import React from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

import { TodoItem } from './TodoItem';
import { useTodos } from '../hooks/useTodos';

export const TodosList: React.FC = () => {
  const { todos } = useTodos();

  return (
    <FlatList
      data={todos}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <TodoItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },
});