import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { TodoInput, TodosList } from '../components';

export const Root = () => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <TodosList />
          <TodoInput />
        </View>
      </KeyboardAvoidingView>
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
