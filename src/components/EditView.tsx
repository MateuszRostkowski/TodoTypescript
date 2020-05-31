// EditView.tsx
import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

import { viewState as viewStateType } from '../Interfaces';
import { useTodos } from '../hooks/useTodos';
import { Button } from './Button';

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
      <TextInput
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
    backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    padding: 15,
    backgroundColor: '#a1a1a1',
    width: '80%',
  },
});
