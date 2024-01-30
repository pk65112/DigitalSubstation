import React from 'react';

import {

  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  FlatList,
  Button,
  TouchableHighlight,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Patrolling from './Patrolling';

const stack = createNativeStackNavigator();
const secIcons = [
  {
    id: 1,
    icon: "Schedule"
  },
  {
    id: 2,
    icon: "Patrolling"
  },
  {
    id: 3,
    icon: "Details"
  },
  {
    id: 4,
    icon: "Abnormality"
  }

]
const HomeScreen = (props) => {
  return (
    <View style={styles.sectionContainer}>

      <View style={[styles.portion1, { flex: 1 }]} >
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <View style={[styles.portion2, { flex: 3 }]}>

        <Text style={{ fontSize: 26 }}>Home Screen</Text>
        <TouchableHighlight>
        <Image style={[styles.imageicon]} source={require('./image/power_grid_logo.png')} />
          <Text style={styles.custombutton}
            onPress={() => props.navigation.navigate('Patrolling', { Patrolling })}>Patolling</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.custombutton}
            onPress={() => props.navigation.navigate('Patrolling', { Patrolling })}>Verifing</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.custombutton}
            onPress={() => props.navigation.navigate('Patrolling', { Patrolling })}>Duty assigning</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.custombutton}
            onPress={() => props.navigation.navigate('Patrolling', { Patrolling })}>Abnormality</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.custombutton}
            onPress={() => props.navigation.navigate('Patrolling', { Patrolling })}>Action</Text>
        </TouchableHighlight>
      </View>
      <View style={[styles.portion3, { flex: 1 }]}>

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
    flexDirection: 'row',
    flexWrap:'wrap',
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


  },
 iconimage :{
    flex: 3,
    flexDirection: 'column',
    height:10, width: 10,
    justifyContent:'center'
    

  }
  
})

export default HomeScreen;
