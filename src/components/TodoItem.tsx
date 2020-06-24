import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

import { Todo } from '../Interfaces';
import { useTodos } from '../hooks';
import { Button } from './Button';
import { Input } from './Input';
import { Checkbox } from './Checkbox';

interface TodoItemProps {
  item: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const { deleteItem, editItem, toggleDoneItem } = useTodos();
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(item.name);
  const inputRef = useRef<TextInput>(null);

  const doneTextStyle = item.done ? [styles.doneTextStyle] : [];

  const handleEditPress = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    setEditMode(!editMode);
  };

  const handleEditTodo = () => {
    setEditMode(!editMode);
    if (!newTitle) {
      return;
    }
    editItem(newTitle, item.id);
  };

  const handleCancelEdit = () => {
    setEditMode(!editMode);
    setNewTitle(item.name);
  };

  if (editMode) {
    return (
      <View style={[styles.todoContainer, styles.todoEditContainer]}>
        <Input
          ref={inputRef}
          style={styles.editInput}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={handleEditTodo}
        />
        <View style={styles.buttonsContainer}>
          <Button type="tertiary" title="Save" onPress={handleEditTodo} />
          <Button type="tertiary" title="Cancel" onPress={handleCancelEdit} />
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
      <View style={styles.heading}>
        <Text style={[styles.todoText, ...doneTextStyle]}>{item.name}</Text>
        {item.user ? <Text style={styles.todoUser}>{item.user}</Text> : null}
      </View>
      <View style={styles.buttonsContainer}>
        <Button type="tertiary" title="Edit" onPress={handleEditPress} />
        <Button type="tertiary" title="X" onPress={() => deleteItem(item.id)} />
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
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  heading: {
    flexDirection: 'column',
    marginBottom: 4,
    maxWidth: 400,
    width: '65%',
  },
  todoText: {
    fontSize: 20,
  },
  todoUser: {
    color: '#444',
  },
  todoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#fff',
    margin: 8,
    padding: 8,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,

    elevation: 5,
  },
  todoEditContainer: {
    height: 70,
    paddingVertical: 0,
  },
});
