import React, { useEffect, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView, Text, View, Button, Alert, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import database from '@react-native-firebase/database';



const reference = database().ref('/Construction/projects');

const regions = ["Odisha", "ER_1", "ER_2", "CC"]
const substations = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const districtlist = [
  { label: 'Puri', value: '1' },
  { label: 'Khurda', value: '2' },
  { label: 'Cuttack', value: '3' }
];
const puriTahsilList = [
  { label: 'Pipili', value: '1' },
  { label: 'Delang', value: '2' }
];
const khurdaTahsilList = [
  { label: 'Khurda', value: '1' },
  { label: 'Jatni', value: '2' }]
const cuttackTahsilList = [ { label: 'Cuttack', value: '1' },
  { label: 'Banki', value: '2' }]

const CreateNotice = (props) => {
  const [district, setDistrict] = useState(null);
  const [tahasil, setTahasil] = useState(null);
  const [slctdTahasilList, setSlctdTahasilList] = useState([]);
  const [slctdRI, setSlctdRIList] = useState([])
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
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
  function getDistrict(sltddata) {
    setDistrict(sltddata);
  }
  function getTahasil(sltddata) {
    setTahasil(sltddata);
  }
  function getsubstation(sltddata) {
    setsubstation(sltddata);
  }
  function tahasilSelection(value) {
    setDistrict(value)

    if (value === "Puri") {
      setSlctdTahasilList(puriTahsil)
    } else {
      if (value == "Khurda") {
        setSlctdTahasilList(khurdaTahsilList)
      }
      else {
        setSlctdTahasilList(cuttackTahsilList)
      }

    }
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
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', borderWidth: 1, borderColor: 'pink', borderRadius: 15 }} behavior="padding" enabled>

      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5, }} >
        <Image style={[styles.logo, { flex: 1 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.text}>Notice under Indian Telegraph Act of 1885</Text>
      </View>
      <View style={{ flex: 7, borderWidth: 1, borderColor: 'green', marginTop: 10, }} >
        <ScrollView>
          <Text style={styles.subtext}> 1 - Revinue details</Text>
          <TextInput style={styles.txtinput} placeholder='Name Of Woner' value={name} onChangeText={(value) => setname(value)} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 20, color: 'blue', textAlign: 'center', paddingTop: 10 }} > District :</Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { flex: 2 }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={districtlist}
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
                setDistrict(item)
                if (item.label=== "Puri") {
                  setSlctdTahasilList(puriTahsilList)
                } else {
                  if (item.label=== "Khurda" ){
                    setSlctdTahasilList(khurdaTahsilList)
                  }
                  else {
                    setSlctdTahasilList(cuttackTahsilList)
                  }

                }


              }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 20, color: 'blue', textAlign: 'center', paddingTop: 10 }} > Tahasil :</Text>
           <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { flex: 2 }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={slctdTahasilList}
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
                setTahasil(item)
                


              }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 20, color: 'blue', textAlign: 'center', paddingTop: 10 }} > RI circle :</Text>
            <Dropdown data={regions} rtndata={getRegion} />
          </View>

          <TextInput style={styles.txtinput} placeholder='Mauza.' value={loa} onChangeText={(value) => setLoa(value)} />
          <TextInput style={styles.txtinput} placeholder='JL No.' value={loadt} onChangeText={(value) => setLoaDt(value)} />
          <TextInput style={styles.txtinput} placeholder='Plot No' value={workPeriod} onChangeText={(value) => setWorkPeriod(value)} />
          <TextInput style={styles.txtinput} placeholder='Khatian No' value={bg} onChangeText={(value) => setBg(value)} />
          <Text style={styles.subtext}> 1 - Postal Adress</Text>
          <TextInput style={styles.txtinput} placeholder='Name of Village./ Street No' value={loa} onChangeText={(value) => setLoa(value)} />
          <TextInput style={styles.txtinput} placeholder='Post Office' value={sap} onChangeText={(value) => setSap(value)} />
          <TextInput style={styles.txtinput} placeholder='PoliceStation' value={contractPrice} onChangeText={(value) => setContractPrice(value)} />
          <TextInput style={styles.txtinput} placeholder='pin No.' value={contractPrice} onChangeText={(value) => setContractPrice(value)} />

          <Dropdown data={substations} rtndata={getsubstation} />

          <TextInput style={styles.txtinput} placeholder='Site Location' value={siteLocation} onChangeText={(value) => setsiteLocation(value)} />

          <TouchableHighlight>
            <Text style={styles.custombutton}
              onPress={() => saveData()}>submit</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
      {/* <View style={[styles.portion4, { flex: 5 }]} >
         
         


      </View> */}

      {/* <ScrollView>
          

          <View style={[styles.portion2, { flex: 5 }]}>

            



          </View>
        </ScrollView> */}

    </KeyboardAvoidingView>
  );
}



export default CreateNotice

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
    marginTop: 30,

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
  portion4: {

    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },

  logo: {
    marginHorizontal: 90,
    flexDirection: 'column',
    height: 50, width: 180,
    justifyContent: 'center',
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: 'red',
    resizeMode: 'center',
    borderRadius: 8
  },
  text: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
    fontStyle: 'italic',
    textDecorationLine: 'underline'

  },
  subtext: {
    textAlign: 'left',
    color: 'blue',
    fontSize: 15,
    fontStyle: 'italic',
    textDecorationLine: 'underline'

  },
  txtinput: {
    textAlign: 'Left',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    fontSize: 13,

    borderRadius: 5,
    padding: 10,
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
    height: 20,
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