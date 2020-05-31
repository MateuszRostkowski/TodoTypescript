// EditView.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { viewState as viewStateType } from '../Interfaces';
import { useTodos } from '../hooks/useTodos';
import { Button } from './Button';
import { Input } from './Input';

interface IProps {
  setViewState: React.Dispatch<React.SetStateAction<viewStateType>>;
}

export const EditView: React.FC<IProps> = ({ setViewState }) => {
  const [itemName, setItemName] = React.useState<string>('');
  const { addItem } = useTodos();

  const onSubmit = async () => {
    await addItem(itemName);
    setViewState('default');
  };

  return (
    <View style={styles.container}>
      <Text>Add a new Item</Text>
      <Input
        style={styles.textInput}
        value={itemName}
        placeholder="Title"
        onChangeText={setItemName}
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#ccc',

    padding: 15,
    marginVertical: 10,
    width: 200,
  },
});
