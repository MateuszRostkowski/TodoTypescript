import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTodos } from '../hooks';
import { Button } from './Button';

type mode = 'all' | 'active' | 'done';
const modes: mode[] = ['all', 'active', 'done'];

export const Controlls: React.FC = () => {
  const { activeFilter, setActiveFilter } = useTodos();

  const renderButtons = () => {
    return modes.map((mode) => {
      const isActive = activeFilter === mode;
      const activeButtonText = isActive ? [styles.activeButtonText] : [];
      return (
        <Button
          type={isActive ? 'primary' : 'secondary'}
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
  activeButtonText: {
    color: 'white',
  },
  container: {
    width: '100%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
