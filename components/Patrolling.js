import React from 'react';
import GetLocation from 'react-native-get-location'
import {

  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();

const secIcons = [
  {
    id: 1,
    description: "spot-1",
    latitude:20.09268,
    longitude:85.66895,
  },
  {
    id: 2,
    description: "Spot-2",
    latitude:20.09268,
    longitude:85.66895,
  },
  {
    id: 3,
    description: "Spot-3",
    latitude:20.09268,
    longitude:85.66895,
  },
  {
    id: 4,
    description: "Spot-4",
    latitude:20.09268,
    longitude:85.66895,
  }

]
const Patrolling = () => {
  return (
    <SecPatrolling/>
  )
}








const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: 'rgba(250, 250, 246, 0.959)',

    flexDirection: 'column',
    height: Dimensions.get("window").height * 0.7,
    width: Dimensions.get("window").width,
  },
  portion: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    textAlign: 'center',

    padding: 10,
  },
  portion2: {
    margin: 30,
    flexDirection: 'column',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 20,
    padding: 10
  },

  logo: {
    flex: 1,
    flexDirection: 'column',
    height: 130, width: 250,

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
    borderRadius: 3,
    marginHorizontal: 20,
    marginTop: 10

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Patrolling;
const SecPatrolling = (props)=>{
  return(
  <View style={styles.sectionContainer}>
      <View style={[styles.portion, { flex: 1 }]}>
        <Text style={styles.logo}> </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>

      <View style={[styles.portion2, { flex: 3 }]}>
        <FlatList 
        data={secIcons} 
        renderItem={({item})=>
        <TouchableHighlight style={{ flex: 1 }}  onPress={() => navigation.navigate('{(item.description)}')}>
         
        <Text style={[styles.text]}>{(item.description)}</Text>
      </TouchableHighlight>}
      />
          
        <TouchableHighlight style={{ flex: 1 }}>
          <Text style={[styles.text]}> login</Text>
        </TouchableHighlight>
      </View>

      <View style={[styles.portion, { flex: 1 }]}>
        <Text>Copy write @ Powergrid </Text>
      </View>
    </View>
  )

}