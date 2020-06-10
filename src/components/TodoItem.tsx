import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Todo } from '../Interfaces';
import { useTodos } from '../hooks';
import { Button } from './Button';
import { Input } from './Input';
import { Checkbox } from './Checkbox';

interface IProps {
  item: Todo;
}

export const TodoItem: React.FC<IProps> = ({ item }) => {
  const { deleteItem, editItem, toggleDoneItem } = useTodos();
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(item.name);

  const doneTextStyle = item.done ? [styles.doneTextStyle] : [];

  const handleEditTodo = () => {
    setEditMode(!editMode);
    editItem(newTitle, item.id);
  };

  const handleCancelEdit = () => {
    setEditMode(!editMode);
    setNewTitle(item.name);
  };

  if (editMode) {
    return (
      <View style={styles.todoContainer}>
        <Input
          style={styles.editInput}
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <View style={styles.buttonsContainer}>
          <Button style={styles.button} title="Save" onPress={handleEditTodo} />
          <Button
            style={styles.button}
            title="Cancel"
            onPress={handleCancelEdit}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.todoContainer}>
      <Checkbox
        value={item.done}
        onValueChange={() => toggleDoneItem(item.id)}
      />
      <View style={styles.todoText}>
        <Text style={[styles.heading, ...doneTextStyle]}>{item.name}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          title="Edit"
          onPress={() => setEditMode(!editMode)}
        />
        <Button
          style={styles.button}
          title="X"
          onPress={() => deleteItem(item.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  doneTextStyle: {
    textDecorationLine: 'line-through',
  },
  editInput: {
    width: '60%',
  },
  button: {
    width: 60,
    padding: 4,
    borderRadius: 2,
    margin: 0,
    height: 40,
    backgroundColor: 'transparent',
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
  todoContainer: {
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#eee',
    margin: 8,
    padding: 8,
  },
});
