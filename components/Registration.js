import React, { useEffect, useState } from 'react';

import { FlatList, Image, Text, View, Button, TextInput, } from 'react-native';
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
  return (
   
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>{userdata}</Text>
      <TextInput placeholder='Name' />
      <TextInput placeholder='Designation' />
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
        
            
      <TextInput placeholder='place of posting' />


    </View>
  );
}

export default Registration;