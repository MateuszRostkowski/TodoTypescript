import React, { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  style?: ViewStyle;
  onPress: () => void;
}

export const Button: FC<ButtonProps> = ({ title, style, onPress, ...rest }) => {
  const buttonStyles = {
    ...styles.button,
    ...style,
  };
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

interface Style {
  button: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  button: {
    borderRadius: 4,
    margin: 5,
    padding: 10,
    width: 200,
    backgroundColor: '#ccff66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
});
