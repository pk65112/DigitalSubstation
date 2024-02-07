import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import {
  StyleSheet, Text, TextInput, View, Dimensions, Image, FlatList, TouchableHighlight, ViewComponent, Button,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
const stack = createNativeStackNavigator();

const Observations = ()=>{
    console.warn('hi');
}

export default Observations;