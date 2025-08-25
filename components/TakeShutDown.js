import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import {
    StyleSheet, ActivityIndicator, Alert, Text, TextInput, Modal, View, Dimensions, Image, FlatList, TouchableHighlight, ViewComponent, Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';

import LineIsoOperation from './LineIsoOperation';

const stack = createNativeStackNavigator();

const TakeShutDown = (props) => {

    let data = ["Pan_Bpd_400KV_Line_Iso", "Pan_Bpd_400KV_Line_E_S"];
    const [refresh, setRefresh] = useState(0);
    const [show, setshow] = useState(false);
    const [pendingWork, setPendingWork] = useState([{ sl: 1, des: "Pan-Bpd ckt-1", loc: "14:00 hr", date: "28-10-24", priority: 5 },
    ])
    const [eqpStatus, setEqpStatus] = useState([]);

    const [udrShtDownLines, setUdrShtDownLines] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [otp, setOtp]=useState(0);
    let shtDwnLines = ([]);


    useEffect(() => {
        getUnderShutDownLines()
        // getEqpStatus();


    }, [refresh]);
    const validate = ()=>{};


    const getUnderShutDownLines = async () => {
        try {

            const requiredData = await database().ref('/SafeGrid/shutDown/emergency').on('value', snapshot => {
                console.log("snapShot", snapshot.val());
                shtDwnLines.slice();
                shtDwnLines = [];
                console.log('Before shtDwnLines:', shtDwnLines)
                snapshot.forEach((child) => {
                    // console.log('child.shStatus', child.val().line);
                    if (child.val().shStatus === "progress"
                    ) {
                        shtDwnLines.push(child.val());
                        console.log('After shtDwnLines :', shtDwnLines)
                        setUdrShtDownLines(shtDwnLines);

                    }
                    else {
                        setUdrShtDownLines(shtDwnLines);
                    }
                })

            });
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <View style={styles.main}>
            <Modal transparent={true}
                visible={showModal}
                animationType='fade'>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <View>
                        <TextInput style={ [styles.txtinput ,{height:100, textAlignVertical: 'top'}]} 
                                   
                                      placeholder='OTP:-'
                                      value={otp}              onChangeText={(value) => setOtp(value)} />
                        
                                    <TouchableHighlight>
                                      <Text style={styles.custombutton}
                                        onPress={() => validate()}>submit</Text>
                                    </TouchableHighlight>
                    </View>
                        <Text> hello</Text>
                        <TouchableHighlight onPress={() => setShowModal(false)}>
                            <Text> close </Text>
                        </TouchableHighlight>
                    </View>

                </View>


            </Modal>

            <View style={styles.sectionContainer}>
                <View style={[styles.portion, { flex: 1 }]}>
                    <Text style={styles.logo}> </Text>
                    <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
                    <Text style={styles.logo}> </Text>
                </View>
                <Text style={[styles.text, { marginBottom: 10 }]}>Choose a line for Operation</Text>
                <View style={{ borderWidth: 1, borderColor: 'pink', borderRadius: 10 }}>


                    <View style={[styles.portion4,]}>
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
                <View style={[styles.portion2, { flex: 6 }]}>
                    <FlatList
                        data={data}
                        renderItem={Item => {
                            return (
                                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(208, 201, 203, 1)', padding: 8, margin: 4, borderWidth: 1, borderRadius: 15, shadowColor: 'green', shadowOpacity: 5, shadowOffset: 4 }}>
                                    <View>
                                        <Text style={{ color: "black", padding: 8, margin: 4, borderRadius: 15, shadowColor: 'green', shadowOpacity: 5, shadowOffset: 4 }}>{Item.item}</Text>
                                    </View>
                                    < TouchableHighlight style={{
                                        backgroundColor: 'rgb(75, 231, 72)', flex: 1, marginLeft: 14, padding: 8, margin: 4,
                                        borderWidth: 1, borderRadius: 15, shadowColor: 'green',
                                        shadowOpacity: 5, shadowOffset: 4,
                                    }} onPress={() => setShowModal(true)}>
                                        <Text style={{
                                            color: "red", textAlign: 'center'
                                        }}>close</Text>
                                    </TouchableHighlight>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={[styles.portion, { flex: 1 }]}>
                    <Text>Copyright @ Powergrid </Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main: { flex: 1 },
    centeredView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    },
    modalView:{
        backgroundColor:'#fff',
        padding:30,
        borderRadius:20,
        shadowColor:'black',
        elevation:5
    },
    sectionContainer: {
        backgroundColor: 'rgba(250, 250, 246, 0.959)',

        flexDirection: 'column',
        height: Dimensions.get("window").height * 0.9,
        width: Dimensions.get("window").width,
    },
    portion: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        textAlign: 'center',

        padding: 10,
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
        margin: 8,
        flexDirection: 'column',
        borderColor: 'red',

        borderRadius: 20,
        padding: 10
    },
    portion4: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'




    },
    logo: {
        flex: 1,
        flexDirection: 'column',
        height: 50, width: 40,

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
        borderRadius: 3,
        marginHorizontal: 20,
        marginTop: 10

    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default TakeShutDown;
