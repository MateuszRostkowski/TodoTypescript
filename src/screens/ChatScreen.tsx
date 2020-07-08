import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import {
  TodoInput,
  TodosList,
  Controlls,
  KeyboardAwareScrollView,
} from '../components';

export const ChatScreen = () => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Chat />
          <ChatInput />
        </View>
      </KeyboardAwareScrollView>
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
