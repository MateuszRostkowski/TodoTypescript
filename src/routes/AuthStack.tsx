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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [password, setPassword] = useState('');

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
      await registerUser(login, password);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>Login by using email</Text>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.separator} />
        <Input value={login} onChangeText={setLogin} />
        <Input value={password} onChangeText={setPassword} />
        <View style={styles.separator} />
        <Button
          loading={loading}
          type="primary"
          title="Login"
          onPress={submitLogin}
        />
        <View style={styles.separator} />
        <Button
          loading={loading}
          type="primary"
          title="Register"
          onPress={submitRegister}
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
