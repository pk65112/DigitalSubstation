import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import {
  StyleSheet, Text, TextInput, View, Dimensions, Image, FlatList, TouchableHighlight, ViewComponent,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
const stack = createNativeStackNavigator();

const reference = database().ref('/spots/pan');

const Patrolling = () => {
  const [spotdata, setspotdata] = useState([]);
  const [lati, setlati] = useState(null);
  const [long, setlong] = useState(null);
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(location => {

      console.log(location);
      setlati(location.longitude);
      setlong(location.latitude);
      // console.log(lati);
      // console.log(long);
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    })

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {

       await database().ref('/spots/pan').once('value' , snapshot => {
        let data = [];
        snapshot.forEach((child)=>{
            console.log(child.val().latitude)
          if(child.val().latitude>=37){
            data.push(child.val());
          console.log(data);
          setspotdata(data)

          }
          
        })
        
      });
      
      // console.log(spotdata);
      
    }
    catch (err) {
      console.log(err);
    }
  }
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'
    },
  ];

  
  const Item = ({title}) => (
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
          console.log('renderItem',Item)
          
          return(
            <Text>{Item.item.description}</Text>
          )
          
        }}
        keyExtractor={item => item.id}
       
      />

        
           
           
             
            
            
           
           
            
  

      </View>

      <View style={[styles.portion, { flex: 1 }]}>
        <Text>Copy write @ Powergrid </Text>
      </View>
    </View>
  )
}

const RenderSpot = (props) => {
  return (
    <View>
      <FlatList
        data={props.name}
        renderItem={item => {
          console.log('detected', item)
        }}
      />
      <Text>{props.name}</Text>
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
