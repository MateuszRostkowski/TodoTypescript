/* eslint-disable no-catch-shadow */
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Input, Button, KeyboardAwareScrollView } from '../components';
import { signIn, registerUser } from '../services';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'Login' | 'Register'>('Login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [password, setPassword] = useState('');

  const opositeMode = mode === 'Register' ? 'Login' : 'Register';

  const submit = async () => {
    setLoading(true);
    try {
      if (mode === 'Login') {
        await signIn(email, password);
      } else {
        await registerUser(email, password, name);
      }
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.authContainer}>
          <Text>{mode} by using email</Text>
          <Text style={styles.error}>{error}</Text>
          <View style={styles.separator} />
          {mode === 'Register' && (
            <Input placeholder="name" value={name} onChangeText={setName} />
          )}
          <Input placeholder="email" value={email} onChangeText={setEmail} />
          <Input
            secureTextEntry
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
            type="tertiary"
            title={`Click to ${opositeMode}`}
            onPress={() => setMode(opositeMode)}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#eee',
    flex: 1,
  },
  error: {
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'red',
  },
  separator: {
    margin: 5,
  },
  container: {
    flexGrow: 1,
  },
  authContainer: {
    marginTop: 20,
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
