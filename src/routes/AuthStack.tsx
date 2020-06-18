/* eslint-disable no-catch-shadow */
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import { Input, Button } from '../components';
import { signIn, registerUser } from '../services';

export const Auth = () => {
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'Login' | 'Register'>('Login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [password, setPassword] = useState('');

  const opositeMode = mode === 'Register' ? 'Login' : 'Register';

  const submit = async () => {
    if (mode === 'Login') {
      await submitLogin();
    } else {
      await submitRegister();
    }
  };

  const submitLogin = async () => {
    setLoading(true);
    try {
      await signIn(login, password);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const submitRegister = async () => {
    setLoading(true);
    try {
      await registerUser(login, password, name);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>{mode} by using email</Text>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.separator} />
        {mode === 'Register' && (
          <Input placeholder="name" value={name} onChangeText={setName} />
        )}
        <Input placeholder="login" value={login} onChangeText={setLogin} />
        <Input
          placeholder="password"
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.separator} />
        <Button
          loading={loading}
          type="primary"
          title={mode}
          onPress={submit}
        />
        <View style={styles.separator} />
        <Button
          loading={loading}
          type="tertiary"
          title={`Click to ${opositeMode}`}
          onPress={() => setMode(opositeMode)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'red',
  },
  separator: {
    margin: 5,
  },
  editContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
