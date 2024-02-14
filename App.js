/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  FlatList,
  Image,
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registration from './components/Registration';
import Home from './components/Home';
import Patrolling from './components/Patrolling';
import Observations from './components/Observations';
import Dropdown from './components/Dropdown';






const Stack = createNativeStackNavigator();



const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{
          title: "Home",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackVisible: false,
          
        }} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Patrolling" component={Patrolling} />
        <Stack.Screen name="Observations" component={Observations} />
        <Stack.Screen name="Dropdown" component={Dropdown} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
