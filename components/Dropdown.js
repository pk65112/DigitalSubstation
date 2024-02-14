import {View,Text,TouchableOpacity,Image,TextInput,FlatList} from 'react-native';
  import React, {useRef, useState} from 'react';
  // const countries = [
   
  //   {country: 'Uruguay', code: '598', iso: 'UY'},
  //   {country: 'Uzbekistan', code: '998', iso: 'UZ'},
  //   {country: 'Vanuatu', code: '678', iso: 'VU'},
  //   {country: 'Vatican', code: '379', iso: 'VA'},
  //   {country: 'Venezuela', code: '58', iso: 'VE'},
  //   {country: 'Vietnam', code: '84', iso: 'VN'},
  //   {country: 'Wallis and Futuna', code: '681', iso: 'WF'},
  //   {country: 'Western Sahara', code: '212', iso: 'EH'},
  //   {country: 'Yemen', code: '967', iso: 'YE'},
  //   {country: 'Zambia', code: '260', iso: 'ZM'},
  //   {country: 'Zimbabwe', code: '263', iso: 'ZW'},
  // ];
  const Dropdown= (props) => {
    console.log(props.data);
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(props.data);
    const [selectedItem, setSelectedItem] = useState('');
    const searchRef = useRef();
    const onSearch = search => {
      if (search !== '') {
        let tempData = data.filter(item => {
          return item.props.data.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        setData(tempData);
      } else {
        setData(props.data);
      }
    };
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 0.5,
            alignSelf: 'center',
            marginTop: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
          }}
          onPress={() => {
            setClicked(!clicked);
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
              height: 300,
              alignSelf: 'center',
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <TextInput
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
            />
  
            <FlatList
              data={data}
              renderItem={({item, index}) => {
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
                      setSelectedCountry(item.props.data);
                      setClicked(!clicked);
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text style={{fontWeight: '600'}}>{item.props.data}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };
  
  export default Dropdown;
