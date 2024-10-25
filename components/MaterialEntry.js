import React, { useEffect, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView, Text, View, Button,Alert, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';

import DropdownCostomise from './DropdownCostomise';
import { Dropdown } from 'react-native-element-dropdown';


const substations = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const description = [{ label: 'Fine Aggregate', value: '1' },
{ label: 'Coarse Aggregate(10mm)', value: '2' },
{ label: 'Coarse Aggregate(20mm)', value: '3' },
{ label: 'Coarse Aggregate(40mm)', value: '4' },
{ label: 'Coarse Aggregate(22-53mm)', value: '5' },
{ label: 'Steel Bar 8mm', value: '6' },
{ label: 'Steel Bar 10mm', value: '7' },
{ label: 'Steel Bar 12mm', value: '8' },
{ label: 'Steel Bar 16mm', value: '9' },
{ label: 'Steel Bar 20mm', value: '10' },
{ label: 'Bricks', value: '11' },
{ label: 'Cement', value: '12' },
{ label: 'Other', value: '13' },
 ]
const unitType = [
  { label: "CUM", value: '1' },
  { label: 'KG', value: '2' },
  { label: 'Each', value: '3' },
  { label: 'Liter', value: '4' },
  { label: 'Meter', value: '5' },
  { label: 'Sq.Meter', value: '6' },
   ]
   const vehicleType = [
    { label: "Tractor", value: '1' },
    { label: 'Two Wheeler', value: '2' },
    { label: 'Three Wheeler', value: '3' },
    { label: 'Four Wheeler', value: '3' },
    { label: 'Hywa', value: '4' },
    { label: 'Others', value: '5' },
     ]
const data1 = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
]; 

const MaterialEntry = (props) => {
 const[projects,setProjcts]=useState([]);
 const[staff,setStaff]=useState([]);
 const[permittedBy,setPermittedBy]=useState(null);
 
  const [vehicle, setVehicle] = useState(null);
  const [vehicletyp, setVehicletyp] = useState(null);
  const [project, setproject] = useState(null);
  const [substation, setsubstation] = useState(null);
  const [unit, setunit] = useState(null);
  const [qty, setQty] = useState(null);
  const[material,setMaterial]=useState(description);
 
  
  const [refresh, setRefresh] = useState(0);
  const [show, setshow] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [itemDes , setItemDes] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [increment, setIncrement] = useState(0);
  
  let data = [];
  let datamat = [];
  let dataUser = [];
  
 
  useEffect(() => {
    getDatabase();
    
  }, []);
  const getDatabase = async () => {
    try {
      setshow(true)
      await database().ref('/Construction/projects/Odisha').on('value', snapshot => {
        console.log("snapshot",snapshot)
        snapshot.forEach((child) => {
          child.forEach((subchild =>{
            data.push({'label':subchild.val().name , 'value':subchild.val().sap});
             
             console.log("projects",data)
              setProjcts(data);
          }))
        })
  
      }).then(() =>console.log( 'Array Data',data) );
    }
    catch (err) {
      console.log(err);
    }

    try {
      setshow(true)
      await database().ref('/users').once('value', snapshot => {
        console.log("snapshotUser",snapshot)
        snapshot.forEach((child) => {
            setsubstation(child.val().substation)
            dataUser.push({'label':child.val().name , 'value':child.val().emp});
             
             console.log("projects",dataUser)
              setStaff(dataUser);
          
        })
  
      }).then(() =>console.log( 'Staff Data',dataUser) );
    }
    catch (err) {
      console.log(err);
    }
    try {
      setshow(true)
      await database().ref('/Material').once('value', snapshot => {
        console.log("snapshotMaterial",snapshot)
        snapshot.forEach((child) => {
            datamat.push({'label':child.val().description , 'value':child.val().matId});
             console.log("material",datamat)
              setMaterial(datamat);
        })
  
      }).then(() =>console.log( 'Array Data',data) );
    }
    catch (err) {
      console.log(err);
    }
   
  }
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
 
  function getProject(sltddata) {
    setproject(sltddata);
  }
 
  function getsubstation(sltddata) {
    setsubstation(sltddata);
  } 
  const saveData = async () => {
    if(project && itemDes && qty  && unit && vehicle && vehicleType && permittedBy){
    
      try {
        const response = await database()
          .ref('/gateIn'+'/'+ substation  )
          .push({
            entryDate:new Date().toLocaleString(),
            project: project,
            itemDes: itemDes,
            qty: qty,
            vehicle: vehicle,
            unit: unit,
            vehicletyp: vehicletyp,
            permittedBy:permittedBy,
          })
          .then(() => { Alert.alert('Thank you',' Registration  successfully',[{Text:'ok', onPress:()=>{props.navigation.pop(2)}, }]);
          setproject(null);
          setItemDes(null);
          setQty(null);
          setunit(null);
          setVehicle(null);
          setVehicletyp(null);
          setPermittedBy(null)
        });
      } catch (error) {
        console.log(error);
      }

    
  }
  else{
    Alert.alert('Warning','please enter all parameters')[{Text:'ok'}]
  }

  }
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View >
        <ScrollView  >
        <View style={styles.container}>
        
       
      </View>
          <View style={[styles.portion1, { flex: 1 }]} >
            <Text style={styles.logo}>  </Text>
            <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
            <Text style={styles.logo}> </Text>
          </View>

          <View style={[styles.portion2, { flex: 5 }]}>

            <Text style={styles.text}>Material Entry Sheet </Text>
           
            <Text style={{flex:0.35 ,paddingLeft:25,paddingTop:10, fontSize:18,color:"black"}} >Project :</Text>
            <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={projects}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setproject(item.value);
            setIsFocus(false);
            console.log("setProject",project)
          }}
          />
           
           
           
            <Text style={{flex:0.5 ,paddingLeft:25,paddingTop:10, fontSize:18,color:"black"}} >Description :</Text>
            <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={material}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setItemDes(item.label);
            setIsFocus(false);
            console.log("description",itemDes)
          }}
          />
            <Text style={{flex:0.5 ,paddingLeft:25,paddingTop:10, fontSize:18,color:"black"}} >Quantity :</Text>
            <TextInput style={[styles.txtinput, {flex:0.5}]}  value={qty} onChangeText={(value) => setQty(value)} />
            <Text style={{flex:0.5 ,paddingLeft:25,paddingTop:10, fontSize:18,color:"black"}} >Unit :</Text>
            <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={unitType}
          search
          maxHeight={300}
          labelField="label"
          valueField="value2"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setunit(item.label);
            setIsFocus(false);
            console.log("unit", unit)
          }}
          />
            <Text style={{flex:0.5 ,paddingLeft:25,paddingTop:10, fontSize:18,color:"black"}} >Vehicle No. :</Text>
            <TextInput style={[styles.txtinput, {flex:0.5}]} value={vehicle} onChangeText={(value) => setVehicle(value)} />
            <Text style={{flex:0.5 ,paddingLeft:25,paddingTop:10, fontSize:18,color:"black"}} >Vehicle Type :</Text>
            <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={vehicleType}
          search
          maxHeight={300}
          labelField="label"
          valueField="value2"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setVehicletyp(item.label);
            setIsFocus(false);
            console.log("unit", vehicletyp)
          }}
          />
            <Text style={{flex:0.5 ,paddingLeft:25,paddingTop:10, fontSize:18,color:"black"}} >Permitted By :</Text>
            <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={staff}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setPermittedBy(item.value);
            setIsFocus(false);
            console.log("setPermitted By",permittedBy)
          }}
          />
           
           
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

export default MaterialEntry;
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