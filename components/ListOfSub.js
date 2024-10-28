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
const ListOfSub = (props) => {
   
    let data = ["Pandiabili","Baripada","Angul","Sundargarh","Rourkela","Rengali","Kaniha","Keonjhar","Bolangir","Indravati","Jeypore"];
   
    

    return (
        <View style={styles.sectionContainer}>
            <View style={[styles.portion, { flex: 1 }]}>
                <Text style={styles.logo}> </Text>
                <Image style={[styles.logo, { flex: 2 }]} source={require('./image/power_grid_logo.png')} />
                <Text style={styles.logo}> </Text>
            </View>
            <Text style={styles.text}>Choose Your Substation
                
            </Text>
            <View style={[styles.portion2, { flex: 6 }]}>

                <FlatList
                    data={data}
                    renderItem={Item => {
                        
                       
                       
                        return (
                            <View style={{ backgroundColor: 'white', padding: 8, margin: 4, borderWidth: 1, borderRadius: 15, shadowColor: 'green', shadowOpacity: 5, shadowOffset: 4 }}>
                               
                                
                                <View style={{ flexDirection: 'row', }}>
                                    < TouchableHighlight style={{ flex: 1 }} onPress={() => props.navigation.navigate('PercentPriority', Item.item, { PercentPriority })}>
                                        <Text>{Item.item}</Text>
                                    </TouchableHighlight>
                                    
                                </View>
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

export default ListOfSub;
