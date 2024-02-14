import React, { useEffect, useState } from 'react';

import { FlatList, Image, Text, View, Button, TextInput,TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';
import Dropdown from './Dropdown';



 
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
   
    <View style={styles.sectionContainer}>
       <View style={[styles.portion1, { flex: 1 }]} >
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>
      <Dropdown data= {regions}/>
      <View style={[styles.portion2, { flex: 3 }]}>
        <ScrollView>
      <Text style={styles.text}>Registration</Text>
      <TextInput style ={styles.txtinput} placeholder='Name' onChangeText={(value)=>setname(value)}/>
      <TextInput style ={styles.txtinput} placeholder='Designation' onChangeText={(value)=>setdesignation(value)} />
      
      <SelectDropdown
            data={region}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={'Select country'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
      <SelectDropdown style ={styles.txtinput}
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
        <SelectDropdown style ={styles.txtinput}
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
         <TextInput style ={styles.txtinput} placeholder='place of posting' />
      <TextInput style ={styles.txtinput} placeholder='password' />
      <TextInput style ={styles.txtinput} placeholder='confirm password' />
         <TouchableHighlight>
          <Text style={styles.custombutton}
          onPress={() => saveData ()}>submit</Text>
        </TouchableHighlight>
            
     
      </ScrollView>
      </View>
      <View style={[styles.portion3, { flex: 1 }]}>

      </View>

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
    fontSize:13,

    borderRadius: 5,
    padding :0,
    marginHorizontal: 20,
    marginTop:8,
    height:Dimensions.get("window").height*0.05


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
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

})



