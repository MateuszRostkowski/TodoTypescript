import React, { FC } from 'react';
import { TouchableOpacity, Text, ViewStyle, StyleSheet } from 'react-native';

interface Props {
  title: string;
  style?: ViewStyle;
  onPress: () => void;
}

export const Button: FC<Props> = ({ title, style, onPress, ...rest }) => {
  const buttonStyles = {
    ...styles.button,
    ...style,
  };
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...rest}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

interface Style {
  button: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  button: {
    borderColor: 'red',
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 200,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
