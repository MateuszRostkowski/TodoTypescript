import React, { FC, forwardRef } from 'react';
import { ViewStyle, StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props {
  style?: ViewStyle;
  ref?: any;
}

export const Input: FC<Props | TextInputProps> = forwardRef(
  ({ style, ...rest }, ref) => {
    const inputStyles = [styles.textInput, style];
    return <TextInput ref={ref} style={inputStyles} {...rest} />;
  },
);

interface Style {
  textInput: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 1000,
    marginVertical: 10,
  },
});
