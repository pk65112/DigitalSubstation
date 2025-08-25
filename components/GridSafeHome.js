import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, BackHandler, Image, Alert, FlatList, Button, TouchableHighlight, } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetLocation from 'react-native-get-location';
import database from '@react-native-firebase/database';
import Sfqp from './Sfqp';
import ListOfSub from './ListOfSub';

const stack = createNativeStackNavigator();

const GridSafeHome = (props) => {
  const [refresh, setRefresh] = useState(0);
  const [show, setshow] = useState(false);
  const [pendingWork, setPendingWork] = useState([{ sl: 1, des: "Pan-Bpd ckt-1", loc: "14:00 hr", date: "28-10-24", priority: 5 },
  ])
  const [eqpStatus, setEqpStatus] = useState([]);
  const [data, setData] = useState([]);
  const [udrShtDownLines, setUdrShtDownLines] = useState([]);

  let shtDwnLines = ([]);


  useEffect(() => {
    getUnderShutDownLines()
    // getEqpStatus();
    

  }, [refresh]);
 
 
 
  const getUnderShutDownLines = async () => {
    try {
      
      const requiredData = await database().ref('/SafeGrid/shutDown/emergency').on('value', snapshot => {
        console.log("snapShot", snapshot.val());
        shtDwnLines.slice();
        shtDwnLines = [];
        console.log('Before shtDwnLines:',shtDwnLines)
        snapshot.forEach((child) => {
          // console.log('child.shStatus', child.val().line);
          if (child.val().shStatus === "progress"
          ) {
            shtDwnLines.push(child.val());
            console.log('After shtDwnLines :', shtDwnLines)
            setUdrShtDownLines(shtDwnLines);
           
          }
          else{
            setUdrShtDownLines(shtDwnLines);
          }
        })
        
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  // const autoRefresh = () => {

  //   setTimeout(() => {
  //     if (data == null) {
  //       getEqpStatus();
  //     }
  //     else {
  //       setshow(false);
  //     }
  //   }, 6000);
  // }

  // const getEqpStatus = async () => {
  //   try {
  //     setshow(true)
  //     const requiredData = await database().ref('/SafeGrid/virtualControl').on('value', snapshot => {
  //       console.log("snapShot", snapshot.val())
  //       setEqpStatus(snapshot.val());
  //       console.log("equipmentdata", eqpStatus)
  //       setData(eqpStatus);
  //     });
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }

  // }





  return (
    <View style={styles.sectionContainer}>

      <View style={[styles.portion1,]} >
        <Text style={styles.logo}>  </Text>
        <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
        <Text style={styles.logo}> </Text>
      </View>

      <View style={[styles.portion2,]}>

        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('NewWorkOrder', { NewWorkOrder })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/workInProgress.png')} />
            <Text style={styles.custombutton}
            >Under ShutDown</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('ListOfSub', { ListOfSub })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/virtualControl.jpg')} />
            <Text style={styles.custombutton}
            >Virtual Control</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} style={styles.iconset}
          onPress={() => props.navigation.navigate('MaterialOut', { MaterialOut })}>
          <View style={{ alignItems: 'center' }}>
            <Image style={[styles.imageicon]} source={require('./image/workCompleted.png')} />
            <Text style={styles.custombutton}
            >Report </Text>
          </View>
        </TouchableHighlight>


      </View>
      <Text style={{ color: "blue", paddingLeft: 10 }}>Ongoing ShutDown Summary :- </Text>

      <View style={{ borderWidth: 1, borderColor: 'pink', borderRadius: 10 }}>
        <View style={[styles.portion2,]}>

          <Text style={{ flex: 1, color: "black" }}>Sl. No</Text>
          <Text style={{ flex: 8, color: "black" }} >Line / Equipment</Text>
          <Text style={{ flex: 4, color: "black" }} >Start Time</Text>
          <Text style={{ flex: 2, color: "black" }}>Date</Text>
          <Text style={{ flex: 2, color: "black" }}>T.Hr.</Text>
        </View>

        <FlatList
          data={udrShtDownLines}
          renderItem={Item => {
            // console.log('renderItem', Item)

            return (
              <View style={[styles.portion2,]}>

                <Text style={{ flex: 1, color: "red" }}> {Item.item.emergencyShId}</Text>
                <Text style={{ flex: 4, color: "red" }} >{Item.item.line}</Text>
                <Text style={{ flex: 2, color: "red" }} >{Item.item.outageFrom}</Text>
                <Text style={{ flex: 2, color: "red" }} >{Item.item.shStDt}</Text>
                <Text style={{ flex: 1, color: "red" }}>{Item.item.outageTo}</Text>
              </View>
            )

          }}
          keyExtractor={item => item.id}
        />

      </View>
      <View style={{ borderWidth: 1, borderColor: 'pink', borderRadius: 10 }}>


        <View style={[styles.portion3,]}>
          {eqpStatus === null ? refresh = refresh + 1 :
            <FlatList
              data={data}
              renderItem={Item => {
                console.log('renderItem', Item)
                if (Item.item == ! null) {

                  return (
                    <View style={[styles.portion2,]}>

                      {

                        Item.item.Pandiabili.Pan_Bpd.LineIsoClose === false ?
                          <Image style={{ flex: 1, height: 70 }} source={require('./image/stLine.png')} />
                          : <Image style={{ flex: 1, height: 70 }} source={require('./image/sltLine.png')} />
                      }

                    </View>



                  )
                }

              }}
              keyExtractor={item => item.id}

            />}


          <Text style={{ flex: 1, textAlign: 'center', color: "blue" }}>pan</Text>
          <Image style={{ flex: 1, height: 70 }} source={require('./image/stLine.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/tLine.png')} />



          <Image style={{ flex: 1, height: 70 }} source={require('./image/stLine.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/stLine.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/stLine.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/sltLine.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/stLine.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/tLine.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/stLine.png')} />
          <Text style={{ flex: 1, textAlign: 'center', color: "blue" }}>BPD</Text>
        </View>
        <View style={[styles.portion3,]}>
          <Text style={{ flex: 1, textAlign: 'center', color: "blue" }}></Text>
          <Image style={{ flex: 1, height: 70 }} source={require('./image/blank.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/vLine.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/blank.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/blank.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/blank.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/blank.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/blank.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/blank.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/clEarth.png')} />
          <Image style={{ flex: 1, height: 70 }} source={require('./image/blank.png')} />

          <Text style={{ flex: 1, textAlign: 'center', color: "blue" }}></Text>


        </View>



      </View>
      <View style={[styles.portion3,]}>

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
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'

  },
  portion2: {
    margin: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',



    paddingBottom: 10,
    justifyContent: 'center'

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
    fontSize: 10,
    textAlign: 'center',
  },
  imageicon: {
    height: 40, width: 40,
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

export default GridSafeHome;