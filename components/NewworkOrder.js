import React, { useEffect, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView, Text, View, Button, Alert, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';
import Dropdown from './Dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';


const reference = database().ref('/Construction/projects');

const priorities = ["Emergency", "Volunerable", "Normal" ]
const substations = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const NewWorkOrder = (props) => {
  const [name, setname] = useState(null);
  const [details, setDetails] = useState(null);
  const [location, setLocation] = useState(null);
  const [priority, setPriority] = useState(null);
  const [userDetails , setUserDetails] = useState([]);
  function getPriority(sltddata) {
    setPriority(sltddata);
  }
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
  },[]);

  const saveData = async () => {
    if (name && details && location && priority ) {
      let date = new Date();
      const dd =date.getDate();
     const mm =date.getMonth();
      const yyyy =date.getFullYear();
      const proposedDate =dd + "/"+mm+"/"+yyyy;
      const proposedTime =date.getTime();

      try {
        const response =  database()
          .ref('/CivilOnM/workProposal' + "/" )
          .push();
          const proposedId =response.key
          await response.set(
          {
            name: name,
            details: details,
            location: location,
            priority: priority,
            proposedDate:proposedDate,
            proposedTime:proposedTime,
            proposedBy:userDetails.userID,
            proposeId:proposedId
           
          })
          .then(() => {
            console.log('proposed key', proposedId)
            Alert.alert('Thank you', ' work proposal is initiated', [{ Text: 'ok', onPress: () => { props.navigation.pop(2) }, }]);
            setname(null);
            setDetails(null);
            setLocation(null);
            setPriority(null);
            
          });
      } catch (error) {
        console.log(error);
      }


    }
    else {
      Alert.alert('Warning', 'please enter all parameters')[{ Text: 'ok' }]
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

            <Text style={styles.text}>Initiate a Work Proposal</Text>
            <TextInput style={styles.txtinput} placeholder='Short Name Of Work ' value={name} onChangeText={(value) => setname(value)} />
            <TextInput style={styles.txtinput} placeholder='Details of work.' value={details} onChangeText={(value) => setDetails(value)} />
            <TextInput style={styles.txtinput} placeholder='Location.' value={location} onChangeText={(value) => setLocation(value)} />
            <Text >Set Priority: -</Text>
            <Dropdown data={priorities} rtndata={getPriority} />
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

export default NewWorkOrder;
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
    fontSize: 13,

    borderRadius: 5,
    padding: 0,
    marginHorizontal: 20,
    marginTop: 8,
    height: Dimensions.get("window").height * 0.05


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