import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Interfaces';
import { useTodos } from '../hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { getCurrentUser } from '../services';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const Separator = () => <View style={styles.separator} />;
const Line = () => <View style={styles.line} />;

export const HomeScreen: FC<Props> = ({ navigation }) => {
  const { todos } = useTodos();
  const user = getCurrentUser();
  return (
    <ScrollView>
      <Separator />
      <View style={styles.tile}>
        <Text style={styles.heading}>Hello {user}</Text>
        <Separator />
        <Line />
        <Separator />
        <Text style={styles.todosHeading}>
          Check out todos what you need to finish
        </Text>
      </View>
      <View style={styles.tile}>
        <Text style={styles.heading}>Check what needs to be done</Text>
        <Separator />
        <Line />
        <Separator />
        <Text style={styles.todosHeading}>Latest Todo</Text>
        <Text>
          {todos[0]?.name} added by {todos[0]?.user}
        </Text>
        <Separator />
        <Line />
        <Separator />
        <Button
          type="primary"
          title="Todos"
          onPress={() => navigation.navigate('Todos')}
        />
      </View>
    </ScrollView>
  );
};

const margin = 16;
const width = Dimensions.get('window').width - margin * 2;

const styles = StyleSheet.create({
  todosHeading: {
    fontWeight: '600',
  },
  separator: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  tile: {
    width,
    backgroundColor: 'white',
    marginHorizontal: margin,
    marginVertical: margin / 2,
    padding: margin,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
