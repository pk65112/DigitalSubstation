import React, { useCallback, useEffect, useState } from 'react'
import { Text, TouchableHighlight, View, Alert, StyleSheet, Dimensions, FlatList } from 'react-native'
import database from '@react-native-firebase/database';
import Dropdown2 from './Dropdown2';
import { Colors } from 'react-native/Libraries/NewAppScreen';



function Schedule() {
  const [securityperson, setsecurityperson] = useState(null);
  const [dutyOutPerson,setDutyOutPerson] =useState(null);
  const [show, setshow] = useState(false);
  const [fetchdata, setFetchdata] = useState([]);
  const [activeUser, setActiveuser] = useState([]);
  const [refresh, setRefresh] = useState(0);
  function getSecurityPerson(sltddata) {
    setsecurityperson(sltddata);
    console.log('selectedSecurity', securityperson)
  }


  let data = [];


  useEffect(() => {
    getDatabase();
    getActiveUser();

  }, []);


  const autoRefresh = () => {

    setTimeout(() => {
      if (data == null) {
        getDatabase();
      }
      else {
        setshow(false);
      }
    }, 6000);
  }

  const getDatabase = async () => {
    try {
      setshow(true)
      await database().ref('/users').once('value', snapshot => {

        snapshot.forEach((child) => {
          if (child.val().designation == "Security") {
            data.push(child.val());
            console.log("fetched data", data)
            setFetchdata(data);
          }


        })

      }).then(() => console.log('Array Data', data));
    }
    catch (err) {
      console.log(err);
    }
    autoRefresh();
  }

  const getActiveUser = async () => {

    try {

      setshow(true)
      await database().ref('/users').on('value', snapshot => {
        let dataActiveUser = [];

        snapshot.forEach((child) => {

          if (child.val().active == true || child.val().onduty == true ) {

            dataActiveUser.push(child.val());
            console.log("fetched data", dataActiveUser)

            setActiveuser(dataActiveUser);

          }

        })

      }
      ).then(() => {
        console.log('Array Data', data)
      });
    }
    catch (err) {
      console.log(err);
    }
    autoRefresh();
  }
  const assignDuty = () => {
    if (securityperson) {
      Alert.alert('Hold on!', 'Are you sure to assign ' + securityperson + 'for duty?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES', onPress: () => {
            saveData();
          }
        },
      ]);
    }
    else {
      Alert.alert('Warning', 'please a person')[{ Text: 'ok' }]
    }

  }

  const saveData = async () => {

    try {
      const response = await database()
        .ref('/users/' + securityperson)
        .update({
          onduty: true
        })
        .then(() => {
          Alert.alert('Thank you', ' Duty assigned to ' + securityperson + '  successfully', [{ Text: 'ok' }]);
          setsecurityperson(null);


        });
    } catch (error) {
      console.log(error);
    }

  }
  const dutyOut = async () => {
        
        
    try {
      const response = await database()
        .ref('/users/' + dutyOutPerson)
        .update({
          active:false,
          onduty: false

        })
        .then(() => {
          Alert.alert('Thank you', ' Duty Out ' + dutyOutPerson + '  successfully', [{ Text: 'ok' }]);
          setDutyOutPerson(null);


        });
    } catch (error) {
      console.log(error);
    }

  }

  const renderItem = useCallback((item) => {

    return (

      <View style={styles.individual}>
        <Text style={{ flex: 1, color: 'black' }}>{item.item.name}</Text>
        {
          item.item.active==true?  <Text style={{ flex: 1, color: 'red' }}>Active</Text>:<Text style={{ flex: 1, color: 'violet' }}>Inactive</Text>
        }
        {
          item.item.onduty==true?  <Text style={{ flex: 1, color: 'green' }}>onduty</Text>:<Text style={{ flex: 1, color: 'red' }}>offduty</Text>
          
        }
        <TouchableHighlight>
        <Text style={styles.txtbtn} onPress={() => {
          setDutyOutPerson(item.item.emp)
          console.log ('dutyOutEmp',item.item.emp);
          console.log ('dutyOutEmp',dutyOutPerson);
          dutyOut();
          // const timeout =()=>setTimeout(() => {
          //   if (dutyOutPerson !== null) {
          //     dutyOut();
          //   }
          //   else {
          //     setDutyOutPerson(item.item.emp)
          //     timeout()
          //   }
          // }, 3000);
          // timeout();
          
        }}>force off</Text>
        </TouchableHighlight>
      </View>
    )




  }, [activeUser])
  const keyExtractor = useCallback((item) => { item.emp })

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.portion1}>
        <Text style={[styles.text, { margin: 10 }]}> Duty schedule</Text>
      </View>
      <View>

        <View style={styles.portionAssign}>
          <View style={styles.portion2}>
            <Text style={styles.txt}>Assign Duty To :-</Text>
            <Dropdown2 data={fetchdata} rtndata={getSecurityPerson} />

          </View>
          <View style={styles.portion3}>
            <TouchableHighlight>
              <Text style={styles.custombutton}
                onPress={() => saveData()}>Add</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.portionAssign} >
          <FlatList
            data={activeUser}
            renderItem={renderItem}


          />

        </View>
      </View>

    </View>
  )
}

export default Schedule
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
    flexDirection: 'row',
    margin: 5,
    padding: 4
  },
  portionAssign: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    padding: 2,
    margin: 4
  },
  portion3: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },


  text: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
    fontStyle: 'italic',


  },
  txt: {
    textAlign: 'left',
    fontSize: 13,
    borderRadius: 5,
    padding: 0,
    marginHorizontal: 20,
    marginTop: 8,
    height: Dimensions.get("window").height * 0.05


  },


  custombutton: {
    backgroundColor: '#F5F2F9',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 8,
    shadowColor: 'pink',
    color: 'blue',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 20
  },
  individual: {
    flexDirection: 'row',
    padding: 8,
    margin: 4,
    borderWidth: 1,
    borderRadius: 8,
  },
  txtbtn: { 
    backgroundColor: 'blue',
     color: 'white', 
     paddingHorizontal: 8, 
     paddingVertical: 2, 
     borderWidth: 3, 
     borderColor: 'yellow',
     borderRadius:8,

     }
  


})