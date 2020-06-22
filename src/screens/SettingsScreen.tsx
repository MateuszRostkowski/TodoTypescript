import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { Button, Input, Box } from '../components';
import { updateUserName, getCurrentUser, logout } from '../services';

export const SettingsScreen = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const user = getCurrentUser();

  const submit = async () => {
    setLoading(true);
    await updateUserName(name);
    setLoading(false);
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Hello {user} you can change your name if you want</Text>
      <Box mt="4px" />
      <Input placeholder="name" value={name} onChangeText={setName} />
      <Box mt="4px" />
      <Button
        loading={loading}
        type="primary"
        title="Change name"
        onPress={submit}
      />
      <Button type="tertiary" title="Logout" onPress={logout} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
