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
import Sfqp from './Sfqp';
import AddMaterials from './AddMaterials';
import NewWorkOrder from './NewworkOrder';
import PriorityAssign from './PriorityAssign';
import ListOfSub from './ListOfSub';



const stack = createNativeStackNavigator();


const GridSafeHome = (props) => {const [deactive, setDeactive] = useState(0);
    const [description, setDescription] = useState(props.route.params);
    const [spotdata, setspotdata] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [pendingWork, setPendingWork] = useState([{ sl: 1, des: "Pan-Bpd ckt-1",loc:"14:00 hr",date:"28-10-24" ,priority: 5 },
    ])
    const getPendingWork = {
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
      resetSpot: () => {
  
      },
      gpsAcess: () => {
        if (!spotdata) {
          setRefresh(refresh + 1);
          homeFunctions.gpsAcess();
        }
        else {
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 50000,
          })
            .then(location => {
              console.log('spots', spotdata);
              const latdiff = location.latitude - spotdata.filter(x => x.id == 107).latitude;
              console.log('latdiff', latdiff);
              const longdiff = location.longitude - spotdata.filter(x => x.id == 107).longitude;
              console.log('longdiff', latdiff);
              homeFunctions.resetSpot();
  
  
            })
            .catch(error => {
              const { code, message } = error;
              console.warn(code, message);
            })
        }
      }
    }
    // useEffect(() => { homeFunctions.getDatabase() }, [refresh]);
    // setInterval(()=>{gpsAcess()},900000)
    return (
      <View style={styles.sectionContainer}>
  
        <View style={[styles.portion1,]} >
          <Text style={styles.logo}>  </Text>
          <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
          <Text style={styles.logo}> </Text>
        </View>
        
        <View style={[styles.portion2,]}>
  
          <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
            onPress={() => props.navigation.navigate('NewWorkOrder', { NewWorkOrder })}>
            <View style={{ alignItems: 'center' }}>
              <Image style={[styles.imageicon]} source={require('./image/workInProgress.png')} />
              <Text style={styles.custombutton}
              >Under ShutDown</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
            onPress={() => props.navigation.navigate('ListOfSub', { ListOfSub })}>
            <View style={{ alignItems: 'center' }}>
              <Image style={[styles.imageicon]} source={require('./image/virtualControl.jpg')} />
              <Text style={styles.custombutton}
              >Virtual Control</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
            onPress={() => props.navigation.navigate('MaterialOut', { MaterialOut })}>
            <View style={{ alignItems: 'center' }}>
              <Image style={[styles.imageicon]} source={require('./image/workCompleted.png')} />
              <Text style={styles.custombutton}
              >Report </Text>
            </View>
          </TouchableHighlight>
  
  
        </View>
        <Text style={{ color: "blue", paddingLeft: 10 }}>Ongoing ShutDown Summary :- </Text>
        <View style={{borderWidth:1,borderColor:'pink',borderRadius:10}}>
          <View style={[styles.portion2,]}>
          
            <Text style={{ flex: 1, color: "black" }}>Sl. No</Text>
            <Text style={{ flex:8, color: "black" }} >Line / Equipment</Text>
            <Text style={{ flex: 4, color: "black" }} >Start Time</Text>
            <Text style={{ flex: 2, color: "black" }}>Date</Text>
            <Text style={{ flex: 2, color: "black" }}>T.Hr.</Text>
          </View>
          <FlatList
            data={pendingWork}
            renderItem={Item => {
              console.log('renderItem', Item)
  
              return (
                <View style={[styles.portion2,]}>
  
                  <Text style={{ flex: 1, color: "red" }}> {Item.item.sl}</Text>
                  <Text style={{ flex: 4, color: "red" }} >{Item.item.des}</Text>
                  <Text style={{ flex: 2, color: "red" }} >{Item.item.loc}</Text>
                  <Text style={{ flex: 2, color: "red" }} >{Item.item.date}</Text>
                  <Text style={{ flex: 1, color: "red" }}>{Item.item.priority}</Text>
                </View>
  
  
  
              )
  
            }}
            keyExtractor={item => item.id}
  
          />
          
        </View>
        <View style={{borderWidth:1,borderColor:'pink',borderRadius:10}}>
          <View style={[styles.portion3,]}>
          <Text style={{ flex: 1,textAlign: 'center', color: "blue" }}>pan</Text>
          <Image style={{flex:1,height: 70}} source={require('./image/stLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/tLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/sltLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/stLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/stLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/stLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/sltLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/stLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/tLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/stLine.png')} />
          <Text style={{ flex: 1,textAlign: 'center', color: "blue" }}>BPD</Text>
          
            
          </View>
          <View style={[styles.portion3,]}>
          <Text style={{ flex: 1,textAlign: 'center', color: "blue" }}></Text>
          <Image style={{flex:1,height: 70}} source={require('./image/blank.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/vLine.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/blank.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/blank.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/blank.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/blank.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/blank.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/blank.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/clEarth.png')} />
          <Image style={{flex:1,height: 70}} source={require('./image/blank.png')} />
          
          <Text style={{ flex: 1,textAlign: 'center', color: "blue" }}></Text>
          
            
          </View>
          {/* <FlatList
            data={pendingWork}
            renderItem={Item => {
              console.log('renderItem', Item)
  
              return (
                <View style={[styles.portion2,]}>
  
                  <Text style={{ flex: 1, color: "red" }}> {Item.item.sl}</Text>
                  <Text style={{ flex: 4, color: "red" }} >{Item.item.des}</Text>
                  <Text style={{ flex: 2, color: "red" }} >{Item.item.loc}</Text>
                  <Text style={{ flex: 1, color: "red" }}>{Item.item.priority}</Text>
                </View>
  
  
  
              )
  
            }}
            keyExtractor={item => item.id}
  
          /> */}
          
        </View>
        <View style={[styles.portion3,]}>
  
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
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center'
  
    },
    portion2: {
      margin:4,
      flexDirection: 'row',
      flexWrap: 'wrap',
      
      
     
      paddingBottom: 10,
      justifyContent: 'center'
  
    },
    portion3: {
      margin:4,
      flexDirection: 'row',
      flexWrap: 'wrap',
      
      justifyContent: 'center'
  
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
      fontSize: 10,
      textAlign: 'center',
    },
    imageicon: {
      height: 40, width: 40,
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
  
export default GridSafeHome;