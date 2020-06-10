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
  textStyle: TextStyle;
  onPress: () => void;
}

export const Button: FC<ButtonProps> = ({
  title,
  style,
  textStyle,
  onPress,
  ...rest
}) => {
  const buttonStyles = [...[styles.button], ...[style]];
  const textStyles = [...[styles.title], ...[textStyle]];
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...rest}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
