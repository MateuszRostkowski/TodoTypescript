import React, { useState, FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { useTodos } from '../hooks/useTodos';
import { Button } from './Button';
import { Input } from './Input';

export const TodoInput: FC = () => {
  const [itemName, setItemName] = useState('');
  const { addItem } = useTodos();

  const onSubmit = async () => {
    if (itemName) {
      setItemName('');
      await addItem(itemName);
    }
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
      <Button title="Add" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textInput: {
    width: '65%',
  },
});
