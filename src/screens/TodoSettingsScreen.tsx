import React, { FC, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import { useTodos, useCurrentTodoList, useTodoLists } from '../hooks';
import { ListItem, Input, Button, Box } from '../components';

const StyledInput = styled(Input)`
  width: 300px;
`;

export const TodoSettingsScreen: FC = () => {
  const [personEmail, setPersonEmail] = useState('');
  const { currentTodoListId } = useTodos();
  const { addPersonToTodoList } = useTodoLists();
  const todoList = useCurrentTodoList(currentTodoListId);

  const handleAddPersonToTodoList = () => {
    addPersonToTodoList(currentTodoListId, personEmail);
  };
  return (
    <SafeAreaView style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Box />
        <View style={styles.container}>
          <Text>Add new person to list</Text>
          <StyledInput
            value={personEmail}
            onChangeText={setPersonEmail}
            placeholder="Email address"
          />
          {todoList?.people.length === 0 ? (
            <Text>You did'nt invite any people to this list. Do it now!</Text>
          ) : (
            <>
              <Text>People in this list</Text>
              {todoList?.people.map((person) => (
                <ListItem
                  key={person.email}
                  title={person.email}
                  iconName="md-trash"
                  onIconPress={() => alert(person.email)}
                />
              ))}
            </>
          )}
        </View>
        <View>
          <Button
            type="primary"
            title="Add person"
            onPress={handleAddPersonToTodoList}
          />
          <Box />
          <Button
            type="tertiary"
            title="Delete list"
            onPress={() => {
              alert(personEmail);
            }}
          />
        </View>
        <Box />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
});
