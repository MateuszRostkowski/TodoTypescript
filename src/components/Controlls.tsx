import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTodos } from '../hooks';
import { Button } from './Button';

const modes = ['all', 'active', 'done'];

export const Controlls: React.FC = () => {
  const { activeFilter, setActiveFilter } = useTodos();

  const renderButtons = () => {
    return modes.map((mode) => {
      const isActive = activeFilter === mode;
      const activeButton = isActive ? [styles.activeButton] : [];
      const activeButtonText = isActive ? [styles.activeButtonText] : [];
      return (
        <Button
          style={[styles.addButton, ...activeButton]}
          textStyle={activeButtonText}
          title={mode.toLocaleUpperCase()}
          onPress={() => setActiveFilter(mode)}
        />
      );
    });
  };

  return <View style={styles.container}>{renderButtons()}</View>;
};

const styles = StyleSheet.create({
  activeButton: {
    backgroundColor: '#06f',
  },
  activeButtonText: {
    color: 'white',
  },
  addButton: {
    width: '30%',
    borderRadius: 1000,
    backgroundColor: '#eee',
    margin: 0,
  },
  container: {
    width: '100%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
