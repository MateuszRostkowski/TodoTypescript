import React, { useState, FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { useTodos } from '../hooks/useTodos';
import { Button } from './Button';
import { Input } from './Input';

export const TodoInput: FC = () => {
  const [itemName, setItemName] = useState('');
  const { addItem } = useTodos();

  const onSubmit = async () => {
    await addItem(itemName);
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.textInput}
        value={itemName}
        placeholder="Title"
        onChangeText={setItemName}
      />
      <Button style={styles.addButton} title="Submit" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: '20%',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#ccc',

    padding: 15,
    marginVertical: 10,
    width: 200,
  },
});
