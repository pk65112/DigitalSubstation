import React, { useEffect, useState } from 'react';

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
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Patrolling from './Patrolling';

import database from '@react-native-firebase/database';
const stack = createNativeStackNavigator();

const Spotvisit = (props) => {
  const [spotdata, setspotdata] = useState([]);
  const [description, setDescription] = useState(props.route.params);
  const [lati, setlati] = useState(null);
  const [long, setlong] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [show, setshow] = useState(false);
  useEffect(() => {


    setshow(true)
    getDatabase();

  }, []);

  const getDatabase = async () => {
    try {
      let today = new Date();
      let mnt = today.getMonth() + 1;
      let year = today.getFullYear();
      let currentTime = today.getTime();
      await database().ref('/patrolling/odisha/pan').orderByValue().limitToLast(2).once('value', snapshot => {
        let data = [];
        snapshot.forEach((child) => {
          child.forEach((nestedChild) => {
            if (nestedChild.val().timestamp >= currentTime - 48 * 3600 * 1000) {
              if (nestedChild.val().name == props.route.params) {
                data.push(nestedChild.val());
                console.log('visitdetails Data', data);
                setspotdata(data)
                console.log('visitdetails', spotdata);
              }


            }

          })

        })

      }).then(() => setshow(false));

      // console.log(spotdata);

    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <View style={styles.sectionContainer}>

      <View style={[styles.portion1,]} >
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <ScrollView>
        <View style={[styles.portion2, { flex: 3,  }]}>
          <Text style={{ fontSize: 22, color: 'red', textDecorationLine: 'underline' }} >{props.route.params}</Text>
          <FlatList
            data={spotdata}
            renderItem={Item => {
              console.log('renderItem', Item)

              return (
                <View style={{ borderWidth: 1, width: '90%', padding: 20, margin: 4, width: Dimensions.get("window").width, borderRadius: 10, borderBlockColor: 'red' }}>
                  <Text style={{ width: '100%', padding: 4, color:'brown' }} >Date :- {Item.item.date}</Text>
                  <Text style={{ width: '100%', padding: 4,color:'brown' }} >Status :- {Item.item.observation}</Text>
                  <Text style={{ width: '100%', padding: 4,color:'brown' }} >Visited By :- {Item.item.securityname}</Text>
                  
                </View>



              )

            }}
            keyExtractor={item => item.id}

          />


        </View>
      </ScrollView>


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
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    

  },
  portion2: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },


  logo: {
    flex: 1,
    flexDirection: 'column',
    height: 50, width: 30,
    justifyContent: 'center',


  },

  text: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
    fontStyle: 'italic',

  },




})

export default Spotvisit;