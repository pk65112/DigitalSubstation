import React, { useEffect, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView, Text, View, Button, Alert, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';
import Dropdown from './Dropdown';



const reference = database().ref('/Construction/projects');

const regions = ["Odisha", "ER_1", "ER_2", "CC"]
const substations = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const NewProjectLine = (props) => {
  const [name, setname] = useState(null);
  const [loa, setLoa] = useState(null);
  const [loadt, setLoaDt] = useState(null);
  const [sap, setSap] = useState(null);
  const [contractPrice, setContractPrice] = useState(null);
  const [workPeriod, setWorkPeriod] = useState(null);
  const [bg, setBg] = useState(null);
  const [schDt, setschDt] = useState(null);
  const [siteLocation, setsiteLocation] = useState(null);
  const [region, setregion] = useState(null);
  const [substation, setsubstation] = useState(null);

  function getRegion(sltddata) {
    setregion(sltddata);
  }
  function getsubstation(sltddata) {
    setsubstation(sltddata);
  }

  const saveData = async () => {
    if (name && loa && loadt && sap && contractPrice && workPeriod && bg && schDt && siteLocation && region && substation) {

      try {
        const response = await database()
          .ref('/LineConstruction/projects' + "/" + region + "/" + substation + "/" + sap)
          .set({
            name: name,
            loa: loa,
            loadt: loadt,
            sap: sap,
            contractPrice: contractPrice,
            workPeriod: workPeriod,
            bg: bg,
            schDt: schDt,
            siteLocation: siteLocation,
            region: region,
            substation: substation
          })
          .then(() => {
            Alert.alert('Thank you', ' Registration  successfully', [{ Text: 'ok', onPress: () => { props.navigation.pop(2) }, }]);
            setname(null);
            setLoa(null);
            setLoaDt(null);
            setSap(null);
            setContractPrice(null);
            setWorkPeriod(null);
            setBg(null);
            setschDt(null);
            setsiteLocation(null);
            setregion(null);
            setsubstation(null)

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

            <Text style={styles.text}>Register New project</Text>
            <TextInput style={styles.txtinput} placeholder='Name Of Work Package' value={name} onChangeText={(value) => setname(value)} />
            <TextInput style={styles.txtinput} placeholder='LOA No.' value={loa} onChangeText={(value) => setLoa(value)} />
            <TextInput style={styles.txtinput} placeholder='LOA date.' value={loadt} onChangeText={(value) => setLoaDt(value)} />
            <TextInput style={styles.txtinput} placeholder='SAP PO No.' value={sap} onChangeText={(value) => setSap(value)} />
            <TextInput style={styles.txtinput} placeholder='Contract Price.' value={contractPrice} onChangeText={(value) => setContractPrice(value)} />
            <TextInput style={styles.txtinput} placeholder='Work Complition Period' value={workPeriod} onChangeText={(value) => setWorkPeriod(value)} />
            <TextInput style={styles.txtinput} placeholder='BG/Security deposite amount' value={bg} onChangeText={(value) => setBg(value)} />
            <TextInput style={styles.txtinput} placeholder='Schedule Date of Work Completion' value={schDt} onChangeText={(value) => setschDt(value)} />
            <Dropdown data={regions} rtndata={getRegion} />
            <Dropdown data={substations} rtndata={getsubstation} />

            <TextInput style={styles.txtinput} placeholder='Site Location' value={siteLocation} onChangeText={(value) => setsiteLocation(value)} />

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

export default NewProjectLine;
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