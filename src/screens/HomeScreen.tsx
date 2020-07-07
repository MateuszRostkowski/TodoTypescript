import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { Box, TodoTile, CreateTodosListTile } from '../components';
import { useTodoLists, useTitle } from '../hooks';

export const HomeScreen: FC = () => {
  const { userTodoLists } = useTodoLists();
  useTitle('Home');
  return (
    <ScrollView>
      <Box />
      <CreateTodosListTile />
      <TodoTile
        name="Todo list"
        description="List for everyone"
        details="This list is for everyone who are using this app"
        id="Todos"
      />
      {userTodoLists.map((list) => (
        <TodoTile key={list.id} {...list} />
      ))}
    </ScrollView>
  );
};
