import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { TodoScreen, HomeScreen } from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={() => <Text>Settings</Text>} />
    </Tab.Navigator>
  );
}

export function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Todos" component={TodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
