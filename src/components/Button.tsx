import React, { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'tertiary';
  title: string;
  loading?: boolean;
  onPress: (() => void) | ((event: GestureResponderEvent) => void) | undefined;
}

export const Button: FC<ButtonProps> = ({
  type = 'secondary',
  loading = false,
  title,
  onPress,
}) => {
  const primaryStyles = type === 'primary' ? [styles.primaryButton] : [];
  const tertiaryStyles = type === 'tertiary' ? [styles.tertiaryButton] : [];
  const primaryTextStyles = type === 'primary' ? [styles.primaryText] : [];
  return (
    <TouchableOpacity
      style={[styles.button, ...primaryStyles, ...tertiaryStyles]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.title, ...primaryTextStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 1000,
    width: '30%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#06f',
  },
  primaryText: {
    color: 'white',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    width: 'auto',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
});
