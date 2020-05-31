// ListItem.tsx
import React from 'react';
import { Text } from 'react-native';

import { Todo } from '../Interfaces';
import { useTodos } from '../hooks/useTodos';
import { Button } from './Button';

interface IProps {
  item: Todo;
}

export const ListItem: React.FC<IProps> = ({ item }) => {
  const { deleteItem } = useTodos();
  return (
    <>
      <Text>{item.name}</Text>
      <Button title="Delete" onPress={() => deleteItem(item.id)} />
    </>
  );
};
