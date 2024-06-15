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
import NewProject from './NewProject';
import MaterialEntry from './MaterialEntry';
import MaterialStock from './MaterialStock';
import MaterialOut from './MaterialOut';


const stack = createNativeStackNavigator();


const Sfqp = (props) => {
  const [deactive, setDeactive] = useState(0);
  const [description, setDescription] = useState(props.route.params);
  const [spotdata, setspotdata] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const homeFunctions = {
    getDatabase: async () => {
      let data = [];
      try {

        await database().ref('/spots/pan').once('value', snapshot => {

          snapshot.forEach((child) => {
            data.push(child.val());
            //  console.log(data)
            setspotdata(data);

          })

        }).then(() => console.log('Array Data', spotdata.filter(spot => { return spot.description == "Home", spot.id })));
      }
      catch (err) {
        console.log(err);
      }

    },
    loggingOut: async () => {
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
  
    },
    resetSpot:()=>{
      
    },
    gpsAcess : () => {
      if (!spotdata) {
        setRefresh(refresh+1);
        homeFunctions.gpsAcess();
      }
      else{
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 50000,
        })
        .then(location => {
          console.log('spots',spotdata);
          const latdiff =location.latitude-spotdata.filter(x => x.id == 107 ).latitude;
          console.log('latdiff',latdiff);
          const longdiff =location.longitude-spotdata.filter(x => x.id == 107 ).longitude;
          console.log('longdiff',latdiff);
         homeFunctions.resetSpot();
          
          
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })
      }


    }




    
  }
 








  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES', onPress: () => {
            homeFunctions.loggingOut();
            BackHandler.exitApp()
          }
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => { homeFunctions.getDatabase() }, [refresh]);
  // setInterval(()=>{gpsAcess()},900000)


  

  return (
    <View style={styles.sectionContainer}>

      <View style={[styles.portion1, { flex: 1 }]} >
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <View style={[styles.portion2, { flex: 3 }]}>

        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('NewProject', { NewProject })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/newProject.jpg')} />
            <Text style={styles.custombutton}
            >NewProject</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('MaterialEntry', { MaterialEntry })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/material.jpg')} />
            <Text style={styles.custombutton}
            >Material Entry</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('MaterialOut', { MaterialOut })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/materialOut.jpg')} />
            <Text style={styles.custombutton}
            >Material Out </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('MaterialStock', { MaterialStock })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/MaterialStock.jpg')} />
            <Text style={styles.custombutton}
            >Material stock</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('MaterialStock', { MaterialStock })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/MaterialStock.jpg')} />
            <Text style={styles.custombutton}
            >Material stock</Text>
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

export default Sfqp;