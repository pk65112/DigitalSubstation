import React, { useEffect, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView, Text, View, Button, Alert, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import database from '@react-native-firebase/database';



const reference = database().ref('/Construction/projects');

const regions = ["Odisha", "ER_1", "ER_2", "CC"]
const substations = ["Pandiabili", "Kaniha", "Indravati", "Rhq_bbsr"]
const compDuring = [

  { label: 'Foundation', value: '1' },
  { label: 'Irrection', value: '2' },
  { label: 'Stringing', value: '2' },
  { label: 'Approch Road', value: '2' }

];


const districtlist = [

  { label: 'Khurda', value: '1' },
  { label: 'Cuttack', value: '2' }
];

const khurdaTahsilList = [
  { label: 'Khurda', value: '1' },
  { label: 'Jatni', value: '2' }]
const cuttackTahsilList = [
  { label: 'Banki', value: '1' }]
const riCircleKhurda = [
  { label: 'Kuradhamala', value: '1' },
  { label: 'Berunha', value: '2' },
  { label: 'Paikatigiria', value: '3' },
  { label: 'Haladia', value: '4' },
]
const ricicleJatni = [
  { label: 'Benapanjuri', value: '1' },
  { label: 'Taraboi', value: '2' },

]


const ricicleBanki = [
  { label: 'Banki', value: '1' },
]




const CreateNotice = (props) => {
  const [slctdTahasilList, setSlctdTahasilList] = useState([]);
  const [slctdRIList, setSlctdRIList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const [landOwnerName, setLandOwnerName] = useState(null);
  const [district, setDistrict] = useState(null);
  const [districtNo, setDistrictNo] = useState(null);
  const [tahasil, setTahasil] = useState(null);
  const [tahasilNo, setTahasilNo] = useState(null);
  const [ri, setRi] = useState(null);
  const [riNo, setRiNo] = useState(null);
  const [mauza, setMauza] = useState(null);
  const [jlNo, setJlNo] = useState(null);
  const [plotNo, setSetPlotNo] = useState(null);
  const [khatianNo, setKhatianNo] = useState(null);
  const [Village, setVillage] = useState(null);
  const [postOffice, setPostOffice] = useState(null);
  const [ps, setPs] = useState(null);
  const [pinNo, setPinNo] = useState(null);
  




  const saveData = async () => {
    const plotNoString = plotNo.replace(/[^0-9]/g, '-') 
    if (landOwnerName && district && tahasil && ri && mauza && jlNo && plotNo && khatianNo && Village && postOffice && ps && pinNo ) {

      try {
        const response = await database()
          .ref('/LineConstruction/400KV_NTPC_PAN'+'/' + districtNo + tahasilNo + riNo + mauza +plotNoString )
          .set({
            landOwnerName: landOwnerName,
            district: district,
            tahasil: tahasil,
            ri: ri,
            mauza: mauza,
            jlNo: jlNo,
            plotNo: plotNo,
            khatianNo: khatianNo,
            Village: Village,
            postOffice: postOffice,
            ps: ps,
            pinNo: pinNo,
            
          })
          .then(() => {
            Alert.alert('Thank you', ' Registration  successfully', [{ Text: 'ok', onPress: () => { props.navigation.pop(2) }, }]);
            setLandOwnerName(null);
            setDistrict(null);
            setDistrictNo(null);
            setTahasil(null);
            setTahasilNo(null);
            setRi(null);
            setRiNo(null);
            setMauza(null);
            setJlNo(null);
            setSetPlotNo(null);
            setKhatianNo(null);
            setVillage(null);
            setPostOffice(null);
            setPs(null);
            setPinNo(null);
           
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
        {/* <Text style={styles.text}>Notice under Indian Telegraph Act of 1885</Text> */}
        <Text style={styles.text}>Register Benificiary</Text>
      </View>
      <View style={{ flex: 7, borderWidth: 1, borderColor: 'green', marginTop: 10, }} >
        <ScrollView>
          <Text style={styles.subtext}> 1 - Revinue details</Text>
          <TextInput style={styles.txtinput} placeholder='Name Of LandWoner' value={landOwnerName} onChangeText={(value) => setLandOwnerName(value)} />
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
                setDistrict(item.label);
                setDistrictNo(item.value);

                if (item.label === "Puri") {
                  setSlctdTahasilList(puriTahsilList)
                } else {
                  if (item.label === "Khurda") {
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
                setTahasil(item.label);
                setTahasilNo(item.value);
                
                if (item.label === "Jatni") {
                  setSlctdRIList(ricicleJatni);
                } else {
                  if (item.label === "Khurda") {
                    setSlctdRIList(riCircleKhurda);
                  }
                  else {
                    setSlctdRIList("Not Found")
                  }

                }
              }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 20, color: 'blue', textAlign: 'center', paddingTop: 10 }} > RI circle :</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { flex: 2 }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={slctdRIList}
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
                setRi(item.label)
                setRiNo(item.value)
              }}
            />
          </View>
          <TextInput style={styles.txtinput} placeholder='Mauza.' value={mauza} onChangeText={(value) => setMauza(value)} />
          <TextInput style={styles.txtinput} placeholder='JL No.' value={jlNo} onChangeText={(value) => setJlNo(value)} />
          <TextInput style={styles.txtinput} placeholder='Plot No' value={plotNo} onChangeText={(value) => setSetPlotNo(value)} />
          <TextInput style={styles.txtinput} placeholder='Khatian No' value={khatianNo} onChangeText={(value) => setKhatianNo(value.toString())} />
          <Text style={styles.subtext}> 2 - Postal Adress</Text>
          <TextInput style={styles.txtinput} placeholder='Name of Village./ Street No' value={Village} onChangeText={(value) => setVillage(value)} />
          <TextInput style={styles.txtinput} placeholder='Post Office' value={postOffice} onChangeText={(value) => setPostOffice(value)} />
          <TextInput style={styles.txtinput} placeholder='PoliceStation' value={ps} onChangeText={(value) => setPs(value)} />
          <TextInput style={styles.txtinput} placeholder='pin No.' value={pinNo} onChangeText={(value) => setPinNo(value)} />
          <TouchableHighlight>
            <Text style={styles.custombutton}
              onPress={() => saveData()}>submit</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>

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
    textAlign: 'left',
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