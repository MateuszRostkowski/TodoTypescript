import React, { FC, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { TodoListItem } from '../Interfaces';
import { showMessage } from 'react-native-flash-message';

import { useTodos, useCurrentTodoList, useTodoLists, useAuth } from '../hooks';
import { ListItem, Input, Button, Box, Text } from '../components';
import { useNavigation } from '@react-navigation/native';
import { updateTodoList } from '../services';

const width = Dimensions.get('screen').width;

const StyledInput = styled(Input)`
  width: 300px;
`;

const StyledTextArea = styled(Input)`
  width: 300px;
  height: 100px;
  border-radius: 20px;
  padding: 10px;
`;

const EditTodoList: FC<{ todoList: TodoListItem }> = ({ todoList }) => {
  const [name, setName] = useState(todoList.name);
  const [description, setDescription] = useState(todoList.description);
  const [details, setDetails] = useState(todoList.details);
  const submit = async () => {
    await updateTodoList(todoList.id, name, description, details);
    showMessage({
      message: 'Details updated successfully',
      icon: 'success',
      type: 'success',
    });
  };
  return (
    <Box width="100%" mt="16px" alignItems="center">
      <Box width="300px">
        <Text>Name</Text>
        <StyledInput value={name} onChangeText={setName} placeholder="Name" />
      </Box>
      <Box width="300px">
        <Text>description</Text>
        <StyledInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
        />
      </Box>
      <Box width="300px">
        <Text>details</Text>
        <StyledTextArea
          value={details}
          onChangeText={setDetails}
          placeholder="Details"
          multiline={true}
          numberOfLines={4}
        />
      </Box>
      <Button title="Save details" onPress={submit} />
    </Box>
  );
};

export const TodoSettingsScreen: FC = () => {
  const [personEmail, setPersonEmail] = useState('');
  const { user } = useAuth();
  const { currentTodoListId } = useTodos();
  const { navigate } = useNavigation();
  const {
    addPersonToTodoList,
    removePersonFromTodoList,
    deleteList,
  } = useTodoLists();
  const todoList = useCurrentTodoList(currentTodoListId);
  const isPersonOwner = todoList?.owner.email === user?.email;

  const handleAddPersonToTodoList = () => {
    if (personEmail !== '') {
      addPersonToTodoList(currentTodoListId, personEmail);
    }
    setPersonEmail('');
  };

  const handleDeleteList = async () => {
    await deleteList(currentTodoListId);
    navigate('Home');
  };

  return (
    <SafeAreaView style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isPersonOwner && todoList ? (
          <EditTodoList todoList={todoList} />
        ) : (
          <Box />
        )}
        <View style={styles.container}>
          {!isPersonOwner && (
            <Box my="16px" alignItems="center">
              <Text>Email owner of that list is {todoList?.owner.email}</Text>
            </Box>
          )}
          {isPersonOwner && (
            <Box my="16px" width="100%" alignItems="center">
              <Text>You are owner of this list</Text>
              <Box mt="16px" />
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
          <Box my="16px">
            <Button
              type="tertiary"
              title="Delete list"
              onPress={handleDeleteList}
            />
          </Box>
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
