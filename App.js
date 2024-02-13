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


const Login = (props) => {
  return (

    <View style={styles.sectionContainer}>
      <View style={[styles.portion1, { flex: 1 }]}>
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, {flex:2}]} source={require('./components/image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <View style={[styles.portion2, { flex: 3 }]}>
        <Text style={styles.sectionTitle}>Let's Login !</Text>
        <TextInput style={styles.txtinput} placeholder='User Name'></TextInput>
        <TextInput style={styles.txtinput} placeholder='Password'></TextInput>
        <TouchableHighlight>
          <Text style={styles.custombutton}
          onPress={() => props.navigation.navigate('Home', { Home })}>Login</Text>
        </TouchableHighlight>
        

      </View>
      <View style={[styles.portion3, { flex: 1 }]}>
      <TouchableHighlight>
          <Text style={styles.custombutton}
          onPress={() => props.navigation.navigate('Registration', { Registration })}>Go for Registration</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.custombutton}
          onPress={() => props.navigation.navigate('Dropdown', { Dropdown })}>Go for Registration</Text>
        </TouchableHighlight>
      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: 'rgba(250, 250, 246, 0.959)',

    flexDirection: 'column',
    height: Dimensions.get("window").height * 0.7,
    width: Dimensions.get("window").width,
  },
  portion1: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    
    
    alignItems: 'center', 
    justifyContent: 'center'
    
  },
  portion2: {
    margin: 30,
    flexDirection: 'column',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 20,
    padding: 10
  },
  portion3: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    textAlign:'center',
    alignItems: 'center', 
    justifyContent: 'center'
   
   
   
    
  },

  logo: {
    flex: 1,
    flexDirection: 'column',
    height:50, width: 30,
    justifyContent:'center',
    

  },
  text: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
    fontStyle: 'italic',

  },
  txtinput: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    fontSize: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign:'center'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  custombutton:{
    backgroundColor: 'pink',
    borderWidth:2,
    borderColor:'red',
    borderRadius:8,
    shadowColor:'pink',
    color:'blue',
    fontSize:20,
    textAlign: 'center',
    padding:5,
    margin:20


  }
})


export default App;
