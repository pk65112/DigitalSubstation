import React, { useEffect, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView, Text, View, Button, Alert, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView, SafeAreaView, ActivityIndicator, ViewComponent } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';

import DropdownCostomise from './DropdownCostomise';
import { Dropdown } from 'react-native-element-dropdown';
import filter from 'lodash.filter';
import CreateNotice from './CreateNotice';


const fillterType = [{ label: 'Notice no.', value: '1' },
{ label: 'Plot No.', value: '2' },
{ label: 'Land owner Name', value: '3' },
{ label: 'Village', value: '4' },
]

const Notice = (props) => {
  const [searchQry, setSearchQry] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [data1, setData1] = useState([]);
  const [error, setError] = useState(null);
  const [fulldata, setFulldata] = useState([]);
  const [project, setproject] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [name, setname] = useState(null);
  const api = 'https://dummyjson.com/users';


  useEffect(() => {
    setIsloading(true);
    fetchData(api);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const user = json.users;
      console.log("jsondata:-", user)
     setData1(user)
      setFulldata(user)
      setIsloading(false)
    } catch (error) {
      setError(error);
      

    }

  }

  if (isloading) {
    return (
      <View>
        <ActivityIndicator size={'large'} color={'blue'}></ActivityIndicator>
      </View>
    )

  }
  if (error) {
    return (
      <View>
        <Text>Error in fetching data</Text>
      </View>
    )

  }

  const handleSearch = (query) => {
    setSearchQry(query);
    const formatQuery = query.toLowerCase();
    const fillteredData = filter(data1,(child)=>{
      return child.email.includes(formatQuery)
    });
   setFulldata(fillteredData);
    console.log('fillteredData',fillteredData)
  }


  return (
    <KeyboardAvoidingView style={[styles.sectionContainer, { flex: 1 }]} behavior="padding" enabled>
      <View style={[styles.portion1, { flex: 1 }]} >
        <Image style={[styles.logo, { flex: 1 }]} source={require('./image/power_grid_logo.png')} />
      
      </View>
      <View style={[styles.topbox, { flex: 1,flexDirection:'row' }]}>
        <TouchableHighlight activeOpacity={0.6} 
          onPress={() => props.navigation.navigate('CreateNotice', { CreateNotice })}>
          <View style={{ alignItems: 'center' , marginRight:20}}>
            <Text style={styles.custombutton}>Add Benificiary</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} 
          onPress={() => props.navigation.navigate('CreateNotice', { CreateNotice })}>
          <View style={{ alignItems: 'center',marginLeft:20 }}>
            <Text style={styles.custombutton}
            >Create Notice</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={[styles.portion2, { flex: 7 }]}>
        <Text style={styles.text}>Notices issued </Text>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{ flex: 1, paddingLeft: 25, paddingTop: 20, fontSize: 18, color: "black" }} >Filter By :</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { flex: 2 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={fillterType}
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
              console.log("before setProject", project)
              setproject(item.value);
              setIsFocus(false);
              console.log("setProject", project)
            }}
          />
        </View>
        
        <SafeAreaView style={{  marginHorizontal: 10 }}>
           
          <TextInput placeholder="Search"
            clearButtonMode="always"
            style={{ paddingHorizontal: 20, paddingVertical: 10,  borderWidth: 1, borderRadius: 8, fontSize: 20 }}
            autoCapitalize='none'
            // value={name} onChangeText={(value) => setname(value)}
            value={searchQry}
            onChangeText={(query) => handleSearch(query)}
          >
          </TextInput>
        </SafeAreaView>
        <FlatList
          data={fulldata}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View  style = {{borderWidth:1,borderColor:'blue',borderRadius:8,margin:2,padding:2,flexDirection:'row'}}>
                <View   style= {{flex:2, }}>
                   <Image  style= {{height:60, width:50}} source={{ uri:item.image }}  />
                </View>
                 <View style= {{flex:9, flexDirection:'column'}}>
                  <Text>{item.id}</Text>
                <Text>{item.email}</Text>
                </View>
                

              </View>
            )
          }
          }
        />
        <Text style={{ flex: 0.5, paddingLeft: 25, paddingTop: 10, fontSize: 18, color: "black" }} >{project} :</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Notice;
const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: 'rgba(250, 250, 246, 0.959)',
    flexDirection: 'column',
    height: Dimensions.get("window").height * 0.7,
    width: Dimensions.get("window").width,
  },
  portion1: {
    height:90,
    paddingVertical:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topbox: {
    flexDirection: 'column',
    justifyContent:'center'
  },
  portion2: {
    margin: 1,
    flexDirection: 'column',
    borderColor: 'red',
    borderWidth: 1,
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
    marginHorizontal:90,
    flexDirection: 'column',
    height: 50, width: 30,
    justifyContent: 'center',
    paddingVertical:30,
    borderWidth:1,
    borderColor:'red',
    resizeMode:'center',
    borderRadius:8
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
  },
  dropdown: {
    margin: 16,
    height: 30,
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