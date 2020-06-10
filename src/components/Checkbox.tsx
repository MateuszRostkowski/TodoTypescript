import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CheckboxProps {
  value: boolean;
  onValueChange: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({ value, onValueChange }) => {
  const checkedStyles = value ? [styles.checkboxChecked] : [];
  return (
    <TouchableOpacity
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
      style={[styles.checkbox, ...checkedStyles]}
      onPress={onValueChange}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 6,
    padding: 4,
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  checkboxChecked: {
    backgroundColor: '#06f',
  },
});
