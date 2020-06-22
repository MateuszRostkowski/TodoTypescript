import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      onPress={onValueChange}>
      {value && <Ionicons name="ios-checkmark" color="white" size={30} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 6,
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  checkboxChecked: {
    backgroundColor: '#06f',
  },
});
