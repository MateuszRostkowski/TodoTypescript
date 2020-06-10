import React, { useState, FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { useTodos } from '../hooks/useTodos';
import { Button } from './Button';
import { Input } from './Input';

export const TodoInput: FC = () => {
  const [itemName, setItemName] = useState('');
  const { addItem } = useTodos();

  const onSubmit = async () => {
    setItemName('');
    await addItem(itemName);
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.textInput}
        value={itemName}
        placeholder="Title"
        onChangeText={setItemName}
        onSubmitEditing={onSubmit}
      />
      <Button style={styles.addButton} title="Add" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: '20%',
    borderRadius: 1000,
    backgroundColor: '#eee',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: '70%',
  },
});
