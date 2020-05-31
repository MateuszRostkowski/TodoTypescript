// ListItem.tsx
import React, { useState } from 'react';
import { Text } from 'react-native';

import { Todo } from '../Interfaces';
import { useTodos } from '../hooks/useTodos';
import { Button } from './Button';
import { Input } from './Input';

interface IProps {
  item: Todo;
}

export const ListItem: React.FC<IProps> = ({ item }) => {
  const { deleteItem, editItem } = useTodos();
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleEditTodo = () => {
    setEditMode(!editMode);
    editItem(newTitle, item.id);
  };

  if (editMode) {
    return (
      <>
        <Text>Type new title</Text>
        <Input value={newTitle} onChangeText={setNewTitle} />
        <Button title="Save" onPress={handleEditTodo} />
      </>
    );
  }

  return (
    <>
      <Text>{item.name}</Text>
      <Button title="Delete" onPress={() => deleteItem(item.id)} />
      <Button title="Edit" onPress={() => setEditMode(!editMode)} />
    </>
  );
};
