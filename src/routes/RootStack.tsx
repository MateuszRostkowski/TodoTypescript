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
          <>
            <EditView setViewState={handleCancelPress} />
            <Button title="Cancel" onPress={handleCancelPress} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
