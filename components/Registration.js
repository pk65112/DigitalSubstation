import React, { useEffect, useState } from 'react';

import { FlatList, Image, Text, View, Button, TextInput,TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';

const reference = database().ref('/user/emp');

const regions  = ["Odisha", "ER_1", "ER_2", "CC"]
const substation  = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const Registration = () => {
  useEffect(()=>{
    getDatabase();
  },[]);
  const [userdata , setuserdata] = useState(null);
  const [name,setname]=useState(null);
  const [designation,setdesignation]=useState(null);
  const [region,setregion]=useState(null);
  const [substation,setsubstation]=useState(null);
  const [unit,setunit]=useState(null);
  

 const getDatabase = async ()=>{
  try{
    const data = await database().ref("user/emp").once('value');
    console.log(data)
    setuserdata(data.val().age)
  }
  catch(err){
    console.log(err);
  }
 }
 const saveData = async ()=>{
  try {
    const response = await  database()
    .ref('/users/123')
    .set({
      name:name,
      designation: designation,
      region: region,
      substation:substation,
      unit: unit,
    })
    .then(() => console.warn('Thank you... Registration successful'));
  } catch (error) {
    console.log(error);
  }
 }
  return (
   
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>{userdata}</Text>
      <TextInput placeholder='Name' onChangeText={(value)=>setname(value)}/>
      <TextInput placeholder='Designation' onChangeText={(value)=>setdesignation(value)} />
      <SelectDropdown
        data={regions}
        defaultButtonText={"Select Region"}
        onSelect={(selectedItem, index) => {
          return selectedItem;
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
         />
        <SelectDropdown
        data={substation}
        defaultButtonText={"Select Substation"}
        onSelect={(selectedItem, index) => {
          return selectedItem;
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }} />
         <TouchableHighlight>
          <Text style={styles.custombutton}
          onPress={() => saveData ()}>submit</Text>
        </TouchableHighlight>
            
      <TextInput placeholder='place of posting' />


    </View>
  );
}

export default Registration;
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
    textAlign:'center',
    alignItems: 'center', 
    justifyContent: 'center'
   
   
   
    
  },

  logo: {
    flex: 1,
    flexDirection: 'column',
    height:50, width: 30,
    justifyContent:'center',
    

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
    textAlign:'center'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  custombutton:{
    backgroundColor: 'pink',
    borderWidth:2,
    borderColor:'red',
    borderRadius:8,
    shadowColor:'pink',
    color:'blue',
    fontSize:20,
    textAlign: 'center',
    padding:5,
    margin:20


  }
})



