import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Input, Box, KeyboardAwareScrollView } from '../components';
import { logout } from '../services';
import { useAuth } from '../hooks';

export const SettingsScreen = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateUserName } = useAuth();

  const submit = async () => {
    setLoading(true);
    await updateUserName(name);
    setLoading(false);
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text>
        Hello {user?.displayName} you can change your name if you want
      </Text>
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
