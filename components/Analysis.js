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
import Spotvisit from './Spotvisit';
import database from '@react-native-firebase/database';
const stack = createNativeStackNavigator();

const Analysis = (props) => {
  const [spotdata, setspotdata] = useState([]);
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
      
      await database().ref('/spots/pan').once('value', snapshot => {
        let data = [];
        snapshot.forEach((child) => {
          console.log(child.val().description)
          data.push(child.val());
              console.log(data);
              setspotdata(data)
              console.log(spotdata);

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
      <ScrollView> 
      <View style={[styles.portion1, { flex: 1 }]} >
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      
      <View style={[styles.portion2, { flex: 3 }]}>
       
      <FlatList numColumns={3} 
          data={spotdata}
          renderItem={Item => {
            console.log('renderItem', Item)

            return (
              <View  style = {{borderWidth:1, width:'30%',margin:4,borderRadius:10,borderBlockColor:'red'}}>
                 <TouchableHighlight  activeOpacity={0.6} style = {[styles.iconset,] }
          onPress={() => props.navigation.navigate('Spotvisit', Item.item.description, { Spotvisit })}>
          <View  style={{alignItems:'center'}}>
            <Image style={[styles.imageicon]} source={require('./image/spot.png')} />
            <Text style={styles.custombutton} >{Item.item.description}</Text>
          </View>
        </TouchableHighlight>
                
              </View>
            )

          }}
          keyExtractor={item => item.id}

        />
         
       
      </View>
      
      <View style={[styles.portion3, { flex: 1 }]}>

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
    paddingHorizontal: 24,
    flexDirection: 'row',


    alignItems: 'center',
    justifyContent: 'center'

  },
  portion2: {
    margin: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
   
    
  },
  portion3: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'




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
    textAlign: 'center'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  custombutton: {
    borderColor: 'red',
    color: 'blue',
    fontSize: 15,
    textAlign: 'center',
  },
  imageicon: {
    height: 80, width: 50,
    backgroundColor:'white'

  },
  icon: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue'
  },
  iconset:{
    alignItems:'center',
    padding:5,
    borderColor:'red',
    borderRadius:10,
    borderWidth:0.5,
    margin:5,
    backgroundColor:'white'

  }
})

export default Analysis;