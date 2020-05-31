import React, { FC } from 'react';
import { ViewStyle, StyleSheet, TextInput } from 'react-native';

interface Props {
  value: string;
  style?: ViewStyle;
  placeholder?: string;
  onChangeText: (value: string) => void;
}

export const Input: FC<Props> = ({
  value,
  style,
  placeholder = 'Title',
  onChangeText,
}) => {
  const inputStyles = {
    ...styles.textInput,
    ...style,
  };
  return (
    <TextInput
      style={inputStyles}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  );
};

interface Style {
  textInput: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  textInput: {
    padding: 15,
    backgroundColor: '#a1a1a1',
    width: '80%',
  },
});
