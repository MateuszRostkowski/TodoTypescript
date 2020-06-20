import React, { FC } from 'react';
import { ViewStyle, StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props {
  style?: ViewStyle;
}

export const Input: FC<Props | TextInputProps> = ({ style, ...rest }) => {
  const inputStyles = [styles.textInput, style];
  return <TextInput style={inputStyles} {...rest} />;
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
