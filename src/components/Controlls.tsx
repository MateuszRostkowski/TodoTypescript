import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTodos } from '../hooks';
import { Button } from './Button';

type mode = 'all' | 'active' | 'done';
const modes: mode[] = ['all', 'active', 'done'];

export const Controlls: React.FC = () => {
  const { activeFilter, setActiveFilter } = useTodos();

  const renderFilterButtons = () => {
    return modes.map((mode, index) => {
      const isActive = activeFilter === mode;
      const activeButtonText = isActive ? [styles.activeButtonText] : [];
      const [first, ...rest] = mode;
      return (
        <Button
          key={index}
          type={isActive ? 'primary' : 'secondary'}
          textStyle={activeButtonText}
          title={`${first.toLocaleUpperCase()}${rest.join('')}`}
          onPress={() => setActiveFilter(mode)}
        />
      );
    });
  };

  const renderControllsButtons = () => (
    <>
      <Button title="Toggle all" onPress={() => {}} />
      <Button title="Delete done" onPress={() => {}} />
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>{renderControllsButtons()}</View>
      <View style={styles.buttonsContainer}>{renderFilterButtons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  activeButtonText: {
    color: 'white',
  },
  buttonsContainer: {
    marginVertical: 5,
    width: '100%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
