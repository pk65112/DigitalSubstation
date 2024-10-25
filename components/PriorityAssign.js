import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import {
    StyleSheet, ActivityIndicator, Alert, Text, TextInput, View, Dimensions, Image, FlatList, TouchableHighlight, ViewComponent, Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';

import PercentPriority from './PercentPriority';
import Geolocation from 'react-native-geolocation-service';
const stack = createNativeStackNavigator();
const reference = database().ref('/spots/pan');
const PriorityAssign = (props) => {
    const [proposedWorkData, SetProposedWorkData] = useState([]);
    const [slno, setSlno] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [show, setshow] = useState(false);
    const [percentPriority,setPercentPiority] =useState(null);
    const [remark,setRemark] =useState(null); 
    let data = [];
    useEffect(() => {
        getDatabase();

    }, [refresh]);
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
            await database().ref('/CivilOnM/workProposal').once('value', snapshot => {

                snapshot.forEach((child) => {

                    data.push(child.val());
                    //  console.log(data)
                    SetProposedWorkData(data);

                })

            }).then(() => console.log('proposedWorkData array', data));
        }
        catch (err) {
            console.log(err);
        }
        autoRefresh();
    }
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.sectionContainer}>
            <View style={[styles.portion, { flex: 1 }]}>
                <Text style={styles.logo}> </Text>
                <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
                <Text style={styles.logo}> </Text>
            </View>
            <Text style={styles.text}>Assign Priority to Proposed Work</Text>
            <View style={[styles.portion2, { flex: 6 }]}>

                <FlatList
                    data={proposedWorkData}
                    renderItem={Item => {
                        
                        console.log('renderItem', Item)
                        const hold = async () => {
                            let date = new Date();
                            const dd = date.getDate();
                            const mm = date.getMonth();
                            const yyyy = date.getFullYear();
                            const holdDate = dd + "/" + mm + "/" + yyyy;
                            const holdTime = date.getTime();
                            try {
                                const response = await database()
                                    .ref('/CivilOnM/workHold' + "/")
                                    .push({
                                        name: Item.item.name,
                                        details: Item.item.details,
                                        location: Item.item.location,
                                        priority: Item.item.priority,
                                        proposedDate: Item.item.proposedDate,
                                        proposedTime: Item.item.proposedTime,
                                        proposedBy: Item.item.proposedBy,
                                        holdDate: holdDate,
                                        holdTime: holdTime,
                                        remark:remark,
                                        percentPriority:percentPriority
                                    })
                                    .then(() => {
                                        Alert.alert('Thank you', ' work is Hold for future', [{ Text: 'ok', onPress: () => { props.navigation.pop(2) }, }]);
                                        clearProposal()
                                    });
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        const clearProposal = async()=> {
                            try{await database().ref('/CivilOnM/workProposal' + "/"+Item.item.proposeId).remove()}
                        catch{}}
                        const reject = async () => {
                            let date = new Date();
                            const dd = date.getDate();
                            const mm = date.getMonth();
                            const yyyy = date.getFullYear();
                            const rejectDate = dd + "/" + mm + "/" + yyyy;
                            const rejectTime = date.getTime();
                            try {
                                const response = await database()
                                    .ref('/CivilOnM/workRejected' + "/")
                                    .push({
                                        name: Item.item.name,
                                        details: Item.item.details,
                                        location: Item.item.location,
                                        priority: Item.item.priority,
                                        proposedDate: Item.item.proposedDate,
                                        proposedTime: Item.item.proposedTime,
                                        proposedBy: Item.item.proposedBy,
                                        rejectDate: rejectDate,
                                        rejectTime: rejectTime,
                                        remark:remark,
                                        percentPriority:percentPriority

                                    })
                                    .then(() => {
                                        Alert.alert('Thank you', ' work is here By Rejected', [{ Text: 'ok', onPress: () => { props.navigation.pop(2) }, }]);
                                        clearProposal()
                                    });
                            } catch (error) {
                                console.log(error);
                            }
                        }
                       
                        return (
                            <View style={{ backgroundColor: 'white', padding: 8, margin: 4, borderWidth: 1, borderRadius: 15, shadowColor: 'green', shadowOpacity: 5, shadowOffset: 4 }}>
                                <Text style={{ color: 'black', padding: 1 }}>WORK:- {Item.item.name} </Text>
                                <Text style={{ color: 'black', padding: 1 }}>DETAILS:- {Item.item.details} </Text>
                                <Text style={{ color: 'black', padding: 1 }}>LOCATION:- {Item.item.location} </Text>
                                <Text style={{ color: 'black', padding: 1 }}>PRIORITY:- {Item.item.priority} </Text>
                                <Text style={{ color: 'black', padding: 1 }}>PROPOSED BY:- {Item.item.proposedBy} </Text>
                                
                                <View style={{ flexDirection: 'row', }}>
                                    < TouchableHighlight style={{ flex: 1 }} onPress={() => props.navigation.navigate('PercentPriority', Item.item, { PercentPriority })}>
                                        <Text> priority</Text>
                                    </TouchableHighlight>
                                    < TouchableHighlight style={{ flex: 1 }} onPress={hold}>
                                        <Text> Hold</Text>
                                    </TouchableHighlight>
                                    < TouchableHighlight style={{ flex: 1 }} onPress={reject}>
                                        <Text> Reject</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id}
                />
                <ActivityIndicator size={'large'} color={'blue'} animating={show} />
            </View>
            <View style={[styles.portion, { flex: 1 }]}>
                <Text>Copyright @ Powergrid </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
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

export default PriorityAssign;
