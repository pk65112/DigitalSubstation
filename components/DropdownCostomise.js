import {View,Text,Dimensions,TouchableOpacity,Image,TextInput,FlatList, ScrollView} from 'react-native';
  import React, {useRef, useState} from 'react';
  
  const DropdownCostomise= (props) => {
    console.log(props.data);
   
    
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const searchRef = useRef();
   
    // const onSearch = search => {
    //   if (search !== '') {
    //     let tempData = data.filter(item => {
    //       return item.props.data.toLowerCase().indexOf(search.toLowerCase()) > -1;
    //     });
    //     setData(tempData);
    //   } else {
    //     setData(props.data);
    //   }
    // };
    return (
      <View style={{flex: 1}}>
       
        <TouchableOpacity
          style={{
            width:270,
            height: 32,
            borderRadius: 10,
            borderWidth: 0.5,
            alignSelf: 'center',
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 15,
          }}
          onPress={() => {
            setClicked(!clicked);
            setData(props.data);
            
          }}>
          <Text style={{fontWeight:'600'}}>
            {selectedItem == '' ? 'Select one' : selectedItem}
          </Text>
          {clicked ? (
            <Image
            source={require('./image/upload.png')}
              style={{width: 20, height: 20}}
            />
          ) : (
            <Image
              source={require('./image/dropdown.png')}
              style={{width: 20, height: 20}}
            />
          )}
        </TouchableOpacity>
        {clicked ? (
          <View
            style={{
              elevation: 5,
              marginTop: 20,
              height: 200,
              alignSelf: 'center',
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            {/* <TextInput
              placeholder="Search.."
              value={search}
              ref={searchRef}
              onChangeText={txt => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={{
                width: '90%',
                height: 50,
                alignSelf: 'center',
                borderWidth: 0.2,
                borderColor: '#8e8e8e',
                borderRadius: 7,
                marginTop: 20,
                paddingLeft: 20,
              }}
            /> */}
           
            <FlatList
              data={data}
              
              renderItem={({item}) => {
                console.log('renderItem',item)
                return (
                 
                  <TouchableOpacity
                  
                    style={{
                      width: '85%',
                      alignSelf: 'center',
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                      borderColor: '#8e8e8e',
                      
                    }}
                    onPress={() => {
                      setSelectedItem(item);
                      props.rtndata(item);
                      setClicked(!clicked);
                      // onSearch('');
                      setSearch('');
                    }}>
                      <Text style={{fontWeight: '600'}}>{item}</Text>
                   
                  </TouchableOpacity>
                  
                );
              }}
            />
           
          </View>
        ) : null}
      </View>
    );
  };
  
  export default DropdownCostomise;