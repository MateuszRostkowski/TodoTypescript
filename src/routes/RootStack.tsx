// App.tsx
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { viewState as viewStateType } from '../Interfaces';
import { DefaultView } from '../components/DefaultView';
import { EditView } from '../components/EditView';
import { Button } from '../components';

export const Root = () => {
  const [viewState, setViewState] = React.useState<viewStateType>('default');

  const handleNewPress = () => setViewState('edit');
  const handleCancelPress = () => setViewState('default');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {viewState === 'default' ? (
          <>
            <DefaultView />
            <Button title="Add new Item" onPress={handleNewPress} />
          </>
        ) : (
          <View style={styles.editContainer}>
            <EditView setViewState={handleCancelPress} />
            <Button title="Cancel" onPress={handleCancelPress} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
