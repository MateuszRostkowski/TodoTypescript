// DefaultView.tsx
import React from 'react';
import { Text, FlatList } from 'react-native';

import { ListItem } from './ListItem';
import { useTodos } from '../hooks/useTodos';

export const DefaultView: React.FC = () => {
  const { todos } = useTodos();

  return (
    <>
      <Text>Todo List</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};
