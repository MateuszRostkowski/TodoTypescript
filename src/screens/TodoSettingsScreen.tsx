import React, { FC, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';

import { useTodos, useCurrentTodoList, useTodoLists } from '../hooks';
import { ListItem, Input, Button, Box, Text } from '../components';
import { getCurrentUser } from '../services';

const width = Dimensions.get('screen').width;

const StyledInput = styled(Input)`
  width: 300px;
`;

export const TodoSettingsScreen: FC = () => {
  const [personEmail, setPersonEmail] = useState('');
  const currentUser = getCurrentUser();
  const { currentTodoListId } = useTodos();
  const { addPersonToTodoList, removePersonFromTodoList } = useTodoLists();
  const todoList = useCurrentTodoList(currentTodoListId);
  const isPersonOwner = todoList?.owner.email === currentUser?.email;

  const handleAddPersonToTodoList = () => {
    if (personEmail !== '') {
      addPersonToTodoList(currentTodoListId, personEmail);
    }
    setPersonEmail('');
  };
  return (
    <SafeAreaView style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Box />
        <View style={styles.container}>
          <Box my="16px" alignItems="center">
            {isPersonOwner ? (
              <Text>You are owner of this list</Text>
            ) : (
              <Text>Email owner of that list is {todoList?.owner.email}</Text>
            )}
          </Box>
          {isPersonOwner && (
            <Box my="16px" width="100%" alignItems="center">
              <Text>Add new person to list</Text>
              <StyledInput
                value={personEmail}
                onChangeText={setPersonEmail}
                placeholder="Email address"
              />
              <Box mt={10} />
              <Button
                type="secondary"
                title="Add person"
                onPress={handleAddPersonToTodoList}
              />
            </Box>
          )}
          {todoList?.people.length === 0 ? (
            <Text style={styles.textCenter} p={20}>
              There are no people invited to this todo. If you are owner of this
              todo do it now!
            </Text>
          ) : (
            <>
              <Text pl={10}>People in this list</Text>
              {todoList?.people.map((person) => (
                <ListItem
                  key={person.email}
                  title={person.email}
                  iconName={isPersonOwner ? 'md-trash' : undefined}
                  onIconPress={() =>
                    removePersonFromTodoList(currentTodoListId, person.email)
                  }
                />
              ))}
            </>
          )}
        </View>
        {isPersonOwner ? (
          <Button
            type="tertiary"
            title="Delete list"
            onPress={() => {
              alert(personEmail);
            }}
          />
        ) : (
          <Box />
        )}
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
    width,
  },
  textCenter: {
    textAlign: 'center',
  },
});
