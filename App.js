/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useId, useState } from 'react';

import {
  FlatList,
  Image,
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Registration from './components/Registration';
import Home from './components/Home';
import Patrolling from './components/Patrolling';
import Observations from './components/Observations';
import Dropdown from './components/Dropdown';
import database from '@react-native-firebase/database';
import Analysis from './components/Analysis';
import Spotvisit from './components/Spotvisit';
import Getgps from './components/Getgps';
import Schedule from './components/Schedule';
import ConstructionHome from './components/ConstructionHome'
import NewProject from './components/NewProject';
import MaterialEntry from './components/MaterialEntry';
import MaterialOut from './components/MaterialOut';
import Sfqp from './components/Sfqp';
import MaterialStock from './components/MaterialStock';
import AddMaterials from './components/AddMaterials';
import CivilMaintenance from './components/CivilMaintenance';
import NewWorkOrder from './components/NewworkOrder';
import PriorityAssign from './components/PriorityAssign';
import PercentPriority from './components/PercentPriority';
import GridSafeHome from './components/GridSafeHome';
import ListOfSub from './components/ListOfSub';







const Stack = createNativeStackNavigator();



const App = () => {
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{
          title: "Home",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackVisible: false,

        }} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Patrolling" component={Patrolling} />
        <Stack.Screen name="Observations" component={Observations} />
        <Stack.Screen name="Dropdown" component={Dropdown} />
        <Stack.Screen name="Analysis" component={Analysis} />
        <Stack.Screen name="Spotvisit" component={Spotvisit} />
        <Stack.Screen name="Getgps" component={Getgps} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="ConstructionHome" component={ConstructionHome} />
        <Stack.Screen name="NewProject" component={NewProject} />
        <Stack.Screen name="MaterialEntry" component={MaterialEntry} />
        <Stack.Screen name="MaterialOut" component={MaterialOut} />
        <Stack.Screen name="Sfqp" component={Sfqp} />
        <Stack.Screen name="MaterialStock" component={MaterialStock} />
        <Stack.Screen name="AddMaterials" component={AddMaterials} />
        <Stack.Screen name="CivilMaintenance" component={CivilMaintenance} />
        <Stack.Screen name="NewWorkOrder" component={NewWorkOrder} />
        <Stack.Screen name="PriorityAssign" component={PriorityAssign} />
        <Stack.Screen name="PercentPriority" component={PercentPriority} />
        <Stack.Screen name="GridSafeHome" component={GridSafeHome} />
        <Stack.Screen name="ListOfSub" component={ListOfSub} />
       

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const Login = (props) => {
  const [userid, setuserid] = useState(null);
  const [password, setpassword] = useState(null);
  // const getDatabase = async ()=>{
  //   try{
  //     const data = await database().ref("user/emp").once('value');
  //     console.log(data)
  //     setuserdata(data.val().age)
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  //  }
  const userDetails ={
    userID :userid,
    passWord: password,
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user_details', JSON.stringify(userDetails));
    } catch (e) {
      // saving error
    }
  };
  const getData = async (value) => {
    try {
     let user_details = await AsyncStorage.getItem('user_details');
     user_details = JSON.parse(user_details);
     console.log('logindata', userDetails)
    } catch (e) {
      // saving error
    }
  };
  let id, pd;
  const loginAttempt = async (id, pd) => {
    try {
      const data = await database().ref('/users/' + userid).once('value');
      console.log(data)
      if (data.val().password == pd) {
        if (data.val().permission == true) {

          if (data.val().onduty == true) {
            if (data.val().active == false) {
              

              try {
                const response = await database()
                  .ref('/users/' + userid + '/active')
                  .set(true)
                  .then(() => {
                    props.navigation.navigate('Home',userid, { Home })
                    setuserid(null);
                    setpassword(null);
                    storeData();
                    getData();
                  });
              } catch (error) {
                console.log(error);
              }

            }
            else {
              Alert.alert('Warning', 'You are already logged in another device')[{ Text: 'ok' }]
            }
          }
          else {
            Alert.alert('Warning', 'You are not on duty')[{ Text: 'ok' }]
          }
        }
        else {
          Alert.alert('Warning', 'please contact with admin for permission')[{ Text: 'ok' }]
        }

      }

      else (
        Alert.alert('Warning', 'Worng password or User id')[{ Text: 'ok' }]

      )

    }
    catch (err) {
      console.log(err);
    }

  }


  return (

    <View style={styles.sectionContainer}>
      <View style={[styles.portion1, { flex: 1 }]}>
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./components/image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <View style={[styles.portion2, { flex: 3 }]}>
        <Text style={styles.sectionTitle}>Let's Login !</Text>
        <TextInput ref={this.useridInput} style={styles.txtinput} placeholder='User Name' value={userid} onChangeText={(value) => setuserid(value)}></TextInput>
        <TextInput style={styles.txtinput} placeholder='Password' value={password} onChangeText={(value) => setpassword(value)}></TextInput>

        <TouchableHighlight>
          <Text style={styles.custombutton}
            onPress={() => loginAttempt(userid, password)}>Login</Text>
        </TouchableHighlight>


      </View>
      <View style={[styles.portion3, { flex: 1 }]}>
        <TouchableHighlight>
          <Text style={styles.custombutton}
            onPress={() => props.navigation.navigate('Registration', { Registration })}>Go for Registration</Text>
        </TouchableHighlight>


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
    flexDirection: 'column',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 20,
    padding: 10
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
    backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 8,
    shadowColor: 'pink',
    color: 'blue',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
    margin: 20


  }
})


export default App;