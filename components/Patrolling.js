import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import {
  StyleSheet, ActivityIndicator, Text, TextInput, View, Dimensions, Image, FlatList, TouchableHighlight, ViewComponent, Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
import Observations from './Observations';

const stack = createNativeStackNavigator();

const reference = database().ref('/spots/pan');

const Patrolling = (props) => {
  const [spotdata, setspotdata] = useState([]);
  const [lati, setlati] = useState(null);
  const [long, setlong] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [show, setshow] = useState(false);
  const [find, setFind] = useState(0)
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
    })
      .then(location => {

        console.log(location);
        setlati(location.latitude);
        setlong(location.longitude);
        console.log('loaded', lati);
        // console.log(long);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })


  }, [refresh]);
  useEffect(() => {
    setshow(true)
    getDatabase();
  }, [find]);
const goto = ()=>{
  
  () => props.navigation.navigate('Observations',Item.item.description ,{ Observations });
  setlati(null);
  setlong(null);
  setspotdata(null)
}
const findSpot = ()=>{
  
  setFind(find+1);
  setRefresh(refresh+1);
  
}
  const getDatabase = async () => {
    try {
      
      await database().ref('/spots/pan').once('value', snapshot => {
        let data = [];
        snapshot.forEach((child) => {
          console.log(child.val().latitude)
          console.log('result', lati);
          if (lati + 0.00030 >= child.val().latitude && child.val().latitude >= lati - 0.00050) {
            if (long + 0.00030 >= child.val().longitude && child.val().longitude >= long - 0.00050) {
              data.push(child.val());
              console.log(data);
              setspotdata(data)
            }


          }

        })

      }).then(() => setshow(false));

      // console.log(spotdata);

    }
    catch (err) {
      console.log(err);
    }
  }



  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <View style={[styles.portion, { flex: 1 }]}>
        <Text style={styles.logo}> </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>

      <View style={[styles.portion2, { flex: 3 }]}>
        
        <FlatList
          data={spotdata}
          renderItem={Item => {
            console.log('renderItem', Item)

            return (
              <View style ={{backgroundColor:'pink', padding:8, margin:4, borderRadius:8,}}>
                < TouchableHighlight onPress={ () => props.navigation.navigate('Observations',Item.item.description ,{ Observations })
                 
 }>
                  <Text style={{color:'black'}}>{Item.item.description} {'>>>'}</Text>
                </TouchableHighlight>
              </View>
            )

          }}
          keyExtractor={item => item.id}

        />
        <ActivityIndicator size={'large'} color={'blue'} animating={show} />
        <Button title='search ' onPress={findSpot} />
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

export default Patrolling;