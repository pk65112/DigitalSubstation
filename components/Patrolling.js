import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import {
  StyleSheet, ActivityIndicator,Alert, Text, TextInput, View, Dimensions, Image, FlatList, TouchableHighlight, ViewComponent, Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
import Observations from './Observations';
import Geolocation from 'react-native-geolocation-service';
const stack = createNativeStackNavigator();

const reference = database().ref('/spots/pan');

const Patrolling = (props) => {
  const [spotdata, setspotdata] = useState([]);
  const[filterdata,setFilterData] = useState([]);
  const [lati, setlati] = useState(null);
  const [long, setlong] = useState(null); 
  const [refresh, setRefresh] = useState(0);
  const [show, setshow] = useState(false);
  const [find, setFind] = useState(0)

  let data = [];
 
  useEffect(() => {
    getDatabase();
    
  }, [refresh]);
  

 const autoRefresh=()=>{

  setTimeout(() => {
    if(data==null){
      getDatabase();
    }
    else{
      setshow(false);
    }
  }, 6000);
 }


  const getLocation= ()=>{
    getDatabase();
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 50000,
    })
      .then(location => {
        console.log('spots',spotdata);
         const firstStgFltr = spotdata.filter(x => x.latitude >= location.latitude - 0.0090
           && x.latitude <= location.latitude + 0.0090 && x.longitude >= location.longitude - 0.0090 
           && x.longitude <= location.longitude + 0.0090 );
        console.log('firstStgFltr',firstStgFltr);
        
       
        setFilterData(firstStgFltr);
        
        
        console.log(location);
        console.log('filtered Data',filterdata)
        
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }

const getDatabase = async () => {
  try {
    setshow(true)
    await database().ref('/spots/pan').once('value', snapshot => {
      
      snapshot.forEach((child) => {
        data.push(child.val());
          //  console.log(data)
            setspotdata(data);

      })

    }).then(() =>console.log( 'Array Data',data) );
  }
  catch (err) {
    console.log(err);
  }
  autoRefresh();
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
          data={filterdata}
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
        <Button title='search ' onPress={getLocation} />
      </View>

      <View style={[styles.portion, { flex: 1 }]}>
        <Text>Copyright @ Powergrid </Text>
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
