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
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registration from './components/Registration';
import Home from './components/Home';
import Patrolling from './components/Patrolling';





const Stack = createNativeStackNavigator();



const App = () => {
  
  return(
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login}  />
    <Stack.Screen name="Home" component={Home} options={{
   title: "Home",
   headerTitleStyle:{
      fontWeight:'bold',
   },
   headerBackVisible:false
}}/>
    <Stack.Screen name="Registration" component={Registration} />
    <Stack.Screen name="Patrolling" component={Patrolling} />
        
    </Stack.Navigator>
  </NavigationContainer>
  );
};

// const HomeScreen = (props) =>{
//   return(

//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style= {{fontSize:26}}>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => props.navigation.navigate( 'Registration', {Registration})}
//       />
//     </View>
//   )
// }
const Login = (props) =>{
  return(

  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style= {{fontSize:26}}>Home Screen</Text>
      <Button
        title="Go to registration"
        onPress={() => props.navigation.navigate( 'Registration', {Registration})}
      />
      <Button
        title="Go to home"
        onPress={() => props.navigation.navigate( 'Home', {Home})}
      />
    </View>
  )
}




export default App;
