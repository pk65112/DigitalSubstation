import React from 'react';

import { FlatList, Image, Text, View, Button, TextInput, } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const regions  = ["Odisha", "ER_1", "ER_2", "CC"]
const substation  = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const Registration = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Registration</Text>
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