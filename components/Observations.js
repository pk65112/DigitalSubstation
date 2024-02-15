import React, { useEffect, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView, Text, View, Button, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';
import Dropdown from './Dropdown';



const reference = database().ref('/user/emp');

const statuss = ["Normal", "Volunerable", "critical"]
const substations = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const designations = ["Executive", "NonExecutive", "AMC security"]
const Observations = () => {
  useEffect(() => {
    console.log(database.ServerValue.TIMESTAMP)
    
    getDatabase();
  }, []);
  const [userdata, setuserdata] = useState(null);
  const [name, setname] = useState('spot');
  const [securityname, setSecurityname] = useState('User');
  const [observation, setObservation] = useState(null);
  const [status, setstatus] = useState(null);
  const [substation, setsubstation] = useState(null);
  const [unit, setunit] = useState(null);
  const [emp, setemp] = useState(null);
  const [password, setpassword] = useState(null);
  const [cnfPassword, setCnfPassword] = useState(null);
  const [placeOfPosting, setPlaceOfPosting] = useState(null);

  function getStatus(sltddata) {
    setstatus(sltddata);
  }
  function getsubstation(sltddata) {
    setsubstation(sltddata);
  }
  function getdesignation(sltddata) {
    setdesignation(sltddata);
  }


  const getDatabase = async () => {
    try {
      const data = await database().ref("user/emp").once('value');
      console.log(data)
      setuserdata(data.val().age)
    }
    catch (err) {
      console.log(err);
    }
  }
  const saveData = async () => {
    if (observation.trim()) {
      try {
        const response = await database()
          .ref('/users/' + emp)
          .set({
            date:new Date().toLocaleString(),
            name: name,
            designation: designation,
            emp: emp,
            region: region,
            substation: substation,
            placeOfPosting: placeOfPosting,
            unit: unit,
            password: password

          })
          .then(() => {
            console.warn('Thank you... Registration successful');
            setname(null);
            setdesignation(null);
            setemp(null);

            setsubstation(null);
            setPlaceOfPosting(null);
            setunit(null);
            setCnfPassword(null);
            setpassword(null);

          });
      } catch (error) {
        console.log(error);
      }

    }
    else {
      console.warn("please enter observations ")
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

            <Text style={styles.text}>Observations</Text>
            <Text style={styles.txtinput}>{name}</Text>
            {/* <Text style={styles.txtinput}>{securityname}</Text> */}
            <TextInput style={styles.txtinput} value={securityname} onChangeText={(value) => setSecurityname(value)} />
            <Text style={{ fontStyle: 'italic', color: 'blackS' }}>{'Select condition :'}</Text>
            <Dropdown data={statuss} rtndata={getStatus} />


            <TextInput style={ [styles.txtinput ,{height:100, textAlignVertical: 'top'}]} 
            multiline={true}
              numberOfLines={4} 
              placeholder='Observation:-'
              
              onChangeText={(value) => setObservation(value)} />

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

export default Observations;
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

