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
  ...rest
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
      {...rest}
    />
  );
};

interface Style {
  textInput: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  textInput: {
    width: '80%',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 1000,
    marginVertical: 10,
  },
});
