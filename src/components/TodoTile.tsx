import React, { FC, useState } from 'react';
import { Text, Dimensions, StyleSheet, TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { Button, Input, Box } from './index';
import { useTodos, useAuth } from '../hooks';
import { createTodoList } from '../services';
import { TodoListItem } from '../Interfaces';

const margin = 16;
const width = Dimensions.get('window').width - margin * 2;

const StyledInput = styled(Input)<TextInputProps>`
  background-color: #f1f1f1;
  margin: 0;
  width: 100%;
`;

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

const Separator = () => <Box mt="8px" />;

const SeparatorWithLine = () => (
  <>
    <Separator />
    <Line />
    <Separator />
  </>
);

export const CreateTodosListTile = () => {
  const [name, setName] = useState('');
  const { user } = useAuth();

  const userEmail = user?.email ? user?.email : 'Cannot find user email';

  const handleCreateList = () => {
    setName('');
    createTodoList(
      name,
      'Attention',
      'You can change description and details from todo settings. You can also add people to your list',
      userEmail,
    );
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
      <Button
        disabled={name === ''}
        type="primary"
        title="Create"
        onPress={handleCreateList}
      />
    </Tile>
  );
};

export const TodoTile: FC<TodoListItem> = ({
  name,
  id,
  description,
  details,
  owner,
}) => {
  const { setCurrentTodoListId } = useTodos();
  const { navigate } = useNavigation();

  const navigateToTodo = () => {
    navigate('Todos');
    setCurrentTodoListId(id);
  };

  return (
    <Tile>
      <Box flexDirection="row">
        <Text style={[styles.heading, styles.halfWidth]}>{name}</Text>
        {owner ? (
          <Text style={[styles.halfWidth, styles.alignRight]}>
            {owner.email}
          </Text>
        ) : null}
      </Box>
      <SeparatorWithLine />
      <Text style={styles.todosHeading}>{description}</Text>
      <Text>{details}</Text>
      <SeparatorWithLine />
      <Button type="primary" title="Go to list" onPress={navigateToTodo} />
    </Tile>
  );
};

const styles = StyleSheet.create({
  halfWidth: {
    width: '50%',
  },
  alignRight: {
    textAlign: 'right',
  },
  todosHeading: {
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
});
