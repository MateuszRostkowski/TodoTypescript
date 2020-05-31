// ListItem.tsx
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
  const [newTitle, setNewTitle] = useState(item.name);

  const handleEditTodo = () => {
    setEditMode(!editMode);
    editItem(newTitle, item.id);
  };

  if (editMode) {
    return (
      <View style={styles.editContainer}>
        <Text>Type new title</Text>
        <Input value={newTitle} onChangeText={setNewTitle} />
        <Button style={styles.button} title="Save" onPress={handleEditTodo} />
      </View>
    );
  }
  const date = item.date;
  const itemDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${
    date.getUTCMonth() + 1
  }.${date.getFullYear()} `;

  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoText}>
        <Text style={styles.heading}>{item.name}</Text>
        <Text>Data dodania:</Text>
        <Text>{itemDate}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          title="Delete"
          onPress={() => deleteItem(item.id)}
        />
        <Button
          style={styles.button}
          title="Edit"
          onPress={() => setEditMode(!editMode)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    borderRadius: 2,
    height: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  todoText: {
    width: '50%',
  },
  heading: {
    marginBottom: 4,
    fontSize: 20,
    width: '100%',
  },
  editContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#FF6666',
    margin: 8,
    padding: 8,
  },
  todoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dd6677',
    margin: 8,
    padding: 8,
  },
});
