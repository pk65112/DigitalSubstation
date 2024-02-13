import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import SelectDropdown from 'react-native-select-dropdown';
import {
  StyleSheet, Text, TextInput, View, Dimensions, Image, FlatList, TouchableHighlight, ViewComponent, Button,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
const stack = createNativeStackNavigator();

const Observations = () => {
  const status  = ["Normal", "Volunerable", "Critical"];
  return (
    <View style={styles.sectionContainer}>

      <View style={[styles.portion1, { flex: 1 }]} >
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <View style={[styles.portion2, { flex: 3 }]}>
        <View style={{ flex: 1 }}>

          <Text>Take Photo</Text>

        </View>
        <View style={{ flex: 2 }}>


          <Text>Spot Name</Text>
          <Text>Security Name</Text>
          <SelectDropdown
        data={status}
        defaultButtonText={"Select status"}
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
         
          <TextInput
          placeholder='Observations'
            multiline={true}
            numberOfLines={10}
            style={{ height: 70, textAlignVertical: 'top',borderWidth:2,width:Dimensions.get("window").width*0.9 }} />


        </View>
      </View>
      <View style={[styles.portion3, { flex: 1 }]}>
        <TouchableHighlight>
          <Text>submit</Text>
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
    flexWrap: 'wrap',


  },
  portion3: {
    paddingHorizontal: 24,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2




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


export default Observations;