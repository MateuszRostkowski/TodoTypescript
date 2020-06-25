import React, { FC, useState } from 'react';
import { ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, Input, Box } from '../components';
import { RootStackParamList } from '../Interfaces';
import { useTodos } from '../hooks';
import { getCurrentUserName, createTodoList } from '../services';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const margin = 16;
const width = Dimensions.get('window').width - margin * 2;

const Tile = styled.View`
  width: ${width}px;
  background-color: white;
  margin: ${margin / 2}px ${margin}px;
  padding: ${margin}px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const Line = styled.View`
  width: 100%;
  height: 2px;
  background-color: #eee;
  border-radius: 2px;
`;

const Separator = () => <Box mt="4px" />;

const SeparatorWithLine = () => (
  <>
    <Separator />
    <Line />
    <Separator />
  </>
);

const StyledInput = styled(Input)`
  background-color: #f1f1f1;
  margin: 0;
  width: 100%;
`;

const CreateTodosListTile = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleCreateList = () => {
    setName('');
    createTodoList(name);
  };
  return (
    <Tile>
      <Text style={styles.heading}>Create new list</Text>
      <SeparatorWithLine />
      <StyledInput
        value={name}
        onChangeText={setName}
        placeholder="Type new list name"
      />
      <SeparatorWithLine />
      <Button type="primary" title="Create" onPress={handleCreateList} />
    </Tile>
  );
};

const TodoTile = () => {
  const { todos } = useTodos();
  const { navigate } = useNavigation();

  const navigateToTodo = () => {
    navigate('Todos');
  };

  return (
    <Tile>
      <Text style={styles.heading}>Check what needs to be done</Text>
      <SeparatorWithLine />
      <Text style={styles.todosHeading}>Latest Todo</Text>
      <Text>
        {todos[0]?.name} added by {todos[0]?.user}
      </Text>
      <SeparatorWithLine />
      <Button type="primary" title="Navigate" onPress={navigateToTodo} />
    </Tile>
  );
};

export const HomeScreen: FC<Props> = ({ navigation }) => {
  const { todos } = useTodos();
  const user = getCurrentUserName();

  return (
    <ScrollView>
      <Separator />
      <Tile>
        <Text style={styles.heading}>Hello {user}</Text>
        <SeparatorWithLine />
        <Text style={styles.todosHeading}>
          Check out todos what you need to finish
        </Text>
      </Tile>
      <CreateTodosListTile navigation={navigation} />
      <TodoTile />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  todosHeading: {
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
});
