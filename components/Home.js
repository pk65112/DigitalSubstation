import React, { useEffect, useState } from 'react';

import {

  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  BackHandler,
  Image,
  Alert,
  FlatList,
  Button,
  TouchableHighlight,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Patrolling from './Patrolling';
import Analysis from './Analysis';
import GetLocation from 'react-native-get-location';
import database from '@react-native-firebase/database';
import Schedule from './Schedule';
import ConstructionHome from './ConstructionHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CivilMaintenance from './CivilMaintenance';
import GridSafeHome from './GridSafeHome';
import ListOfSub from './ListOfSub';




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
  const [deactive, setDeactive] = useState(0);
  const [description, setDescription] = useState(props.route.params);
  const [spotdata, setspotdata] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [userDetails , setUserDetails] = useState([]);
  const[refLatitude, setRefLatitude] =useState(null)
  const[refLongitude, setRefLongitude] =useState(null)

  const getData = async () => {
    try {
     let user_details = await AsyncStorage.getItem('user_details');
     user_details = JSON.parse(user_details);
     setUserDetails(user_details);
     console.log('storeedData',userDetails)
    } catch (e) {
      // saving error
    }
  };
  useEffect(()=>{
    getData();
    if(userDetails.userID===60065112){}
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 50000,
      })
        .then(location => {
          setRefLatitude(location.latitude);
          console.log('Ref latitude', refLatitude);
          setRefLongitude(location.longitude);  
          console.log('Ref latitude', refLongitude);
          interval
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })
    
  },[]);
  const interval = setInterval(() => {
    refLocationUpdatate();
}, 1000000);
  const refLocationUpdatate = async()=>{
    try {
      const response = await database()
        .ref('/ReferenceLocation/'  + '/latitude')
        .set(refLatitude
        )
        ;
    } catch (error) {
      console.log(error); 
    }
    try {
      const response = await database()
        .ref('/ReferenceLocation/'  + '/longitude')
        .set(refLongitude
        )
        ;
    } catch (error) {
      console.log(error); 
    }


  }
   const loggingOut = async () => {
      try {
        const response = await database()
          .ref('/users/' + description + '/active')
          .set(false
          )
          .then(() => {
            setDeactive(deactive + 1)
            Alert.alert('Thank you', ' you are logged out', [{ Text: 'ok', onPress: () => { props.navigation.pop(1) }, }]);
  
          });
      } catch (error) {
        console.log(error); 
      }
  
    }
   
 
  return (
    <View style={styles.sectionContainer}>
      <Text >User :-  {userDetails.userID} ,{refLatitude},{refLongitude} </Text>
      <View style={[styles.portion1, { flex: 1 }]} >
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <View style={[styles.portion2, { flex: 3 }]}>

        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('Patrolling', { Patrolling })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/securityPatrolling.png')} />
            <Text style={styles.custombutton}
            >Patolling</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('Schedule', { Schedule })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/shedule.png')} />
            <Text style={styles.custombutton}
            >Schedule</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('Analysis', { Analysis })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/analysis.png')} />
            <Text style={styles.custombutton}
            >Analysis</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('ConstructionHome', { ConstructionHome })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/constuction.jpg')} />
            <Text style={styles.custombutton}
            >Construction </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('CivilMaintenance', { CivilMaintenance })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/civilOnM.jpg')} />
            <Text style={styles.custombutton}
            >Civil O & M </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('GridSafeHome', { GridSafeHome })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/safety.jpg')} />
            <Text style={styles.custombutton}
            >Safe Grid </Text>
          </View>
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
    backgroundColor: 'white'

  },
  icon: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue'
  },
  iconset: {
    alignItems: 'center',
    padding: 5,
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 5,
    backgroundColor: 'white'

  }
})

export default HomeScreen;