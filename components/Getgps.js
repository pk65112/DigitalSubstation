import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import {
  StyleSheet, ActivityIndicator,Alert, Text, TextInput, View, Dimensions, Image, FlatList, TouchableHighlight, ViewComponent, Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
const Getgps = (props) => {
  
  const [lati, setlati] = useState(null);
  const [long, setlong] = useState(null); 
  const [refresh, setRefresh] = useState(0);
  const [show, setshow] = useState(false);
 
  useEffect(() => {
    getLocation();
    
  }, [refresh]);
  
  const getLocation= ()=>{
    setshow(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    })
      .then(location => {  
        console.log(location);
        setlati(location.altitude);
        setlong(location.longitude);
        setshow(false);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }
  return (
    <View style={styles.sectionContainer}>
      <View style={[styles.portion, { flex: 1 }]}>
        <Text style={styles.logo}> </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <View style={[styles.portion2, { flex: 3 }]}>  
        <ActivityIndicator size={'large'} color={'blue'} animating={show} />
        <Text style={styles.text}>Latitude: {lati}</Text>
        <Text style={styles.text}>Longitude: {long}</Text>
        <Button title='search ' onPress={setRefresh(refresh+1)} />
      </View>
      <View style={[styles.portion, { flex: 1 }]}>
        <Text>Copy write @ Powergrid </Text>
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
    height: 50, width: 40,

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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Getgps;
