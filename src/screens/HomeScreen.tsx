import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Interfaces';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button title="todos" onPress={() => navigation.navigate('Todos')} />
    </SafeAreaView>
  );
};
