import React, { useEffect, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView,Alert, Text, View, Button, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';
import Dropdown from './Dropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Patrolling from './Patrolling';
import HomeScreen from './Home';

const Stack = createNativeStackNavigator();

const reference = database().ref('/user/emp');

const statuss = ["Normal", "Volunerable", "critical"]
const substations = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const designations = ["Executive", "NonExecutive", "AMC security"]
const PercentPriority = (props) => {
  const [name, setname] = useState(props.route.params);
  const [securityname, setSecurityname] = useState(null);
  const [observation, setObservation] = useState(null);
  const [status, setstatus] = useState(null);
  const[timestamp, setTimestamp] = useState(null);
  
  
  function getStatus(sltddata) {
    setstatus(sltddata);
  }
  useEffect(() => {
    let date = new Date();
  setTimestamp(date.getTime());
  console.log(date.getFullYear());
  
  },[] );
 
  
  const saveData = async () => {
    
    let month = new Date().getMonth()+1;
    let year = new Date().getFullYear();


    if (observation && securityname) {
      try {
        const response = await database()
          .ref('/patrolling/odisha/pan/'+year + month )
          .push({
            date:new Date().toLocaleString(),
            timestamp:timestamp,
            name: name,
            securityname:securityname,
            observation:observation

          })
          .then(() => {
          Alert.alert('Thank you',' Observation submitted successfully',[{Text:'ok', onPress:()=>{props.navigation.pop(2)}, }]);
            
            setObservation(null);
            setSecurityname(null); 
            
            
          });
      } catch (error) {
        console.log(error);
      }

    }
    else {
      Alert.alert('Warning','please enter username & observations')[{Text:'ok'}]
      
    }
    

  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View >
        <ScrollView>
          <View style={[styles.portion1, { flex: 1 }]} >
            <Text style={styles.logo}>  </Text>
            <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
            <Text style={styles.logo}> </Text>
          </View>

          <View style={[styles.portion2, { flex: 5 }]}>

            <Text style={styles.text}>Assign Priority (in percentage)</Text>
            <Text style={styles.txtinput}>Work:-  {props.route.params.name}</Text>
            <Text style={styles.txtinput}>Details:-  {props.route.params.details}</Text>
            <Text style={styles.txtinput}>Location:-  {props.route.params.location}</Text>
            <Text style={styles.txtinput}>Priority Given By initiator:-  {props.route.params.priority}</Text>
            <Text style={styles.txtinput}>Initiator:-  {props.route.params.proposedBy}</Text>

            {/* <Text style={styles.txtinput}>{securityname}</Text> */}
            <TextInput style={{backgroundColor:'white',borderRadius:8, marginHorizontal:30,maxHeight:30,padding:4, marginTop:8}} placeholder = 'Percentage of Priority' value={securityname} onChangeText={(value) => setSecurityname(value)} />
            


          

            <TouchableHighlight>
              <Text style={styles.custombutton}
                onPress={() => saveData()}>submit</Text>
            </TouchableHighlight>



          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default PercentPriority;
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
    marginTop:20,

    alignItems: 'center',
    justifyContent: 'center'

  },
  portion2: {
    margin:2,
    flexDirection: 'column',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 20,
    padding: 2,
    backgroundColor:'skyblue',
    marginTop:30,
  },
  portion3: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    




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
    marginVertical:15,
    fontWeight:'500',
    
  },
  txtinput: {
    textAlign: 'left',
    color:'black',
    borderColor: 'white',
    backgroundColor: 'skyblue',
    fontSize: 18,
    fontWeight:'500',
    
    paddingLeft:12,
    marginHorizontal: 20,
    
   


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
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

})

