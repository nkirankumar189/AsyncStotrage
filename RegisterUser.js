

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Button
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Map from './Map';
import authAxios from '../token';
import Mytextinput from '../pages/components/Mytextinput';
import Mybutton from '../pages/components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import { Picker } from '@react-native-picker/picker';
import MyPicker from './components/MyPicker';
import GeoLocation from './GeoLocation';
var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  const [country, setCountry] = useState("selecteds");
  const [countryList,setCountryLIst]=useState([])
  const [state, setState] = useState("");
  const [cityList,setCityList]=useState([])
  const [city, setCity] = useState("");
  const [data,setData]=useState([]);
  const [ currentLongitude,setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus,setLocationStatus] = useState('');
  const [loading,setLoading]=useState(false)
  // var
  // let
  // const
 //Global Declaration for Countrycode to read state,city
      global.countryCode;
      // global.country=SelectCountry;
      // global.country='select';
      // global.state;
      // global.city;

  let register_user = () => {
    console.log(userName, userContact, userAddress,country,state,city);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress,country,state,city],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };


  useEffect(() => {
    //  getStateList();
    // getCities();
    getCountryList();

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch();//watchId
    };
  }, [])

   const getCountryList = async() => {
      const api="https://api.countrystatecity.in/v1/countries";
    // const api="https://apps.apbjpdata.org/services/membership/add";
      await authAxios
    // await axios
     .get(api)
     .then((response) => 
  
     setCountryLIst(response.data))
     setLoading(true)
      // .then((response =>{
      //    let element = this.countries;

      // const value:any = {
      //   id: 0,
      //   name: 'Select',
      //   iso2: 'Select',
      // };
      //    this.countries.slice(0,value);
        // const value =  response.data.push(select);
        // console.log('response..',value);
        // setCountryLIst(value)
      // })
      
        // .then((response)=>console.log(response.data))
          // for (let i = 0; i < this.countries.length; i++) {
    //   let element = this.countries;
  //     const value:any = {
  //       id: 0,
  //       name: 'Select',
  //       iso2: 'Select',
  //     };
                
  // this.countries.slice(0,value);
        .catch((error) => console.log("error", error));
    }

  const getStateList = async (StateCode) => {
     //const api = "https://api.countrystatecity.in/v1/countries/IN";
   const api=`https://api.countrystatecity.in/v1/countries/${StateCode}/states`;
                
    await authAxios
      .get(api)
         .then((response) => setData(response.data))
        // .then((response)=>console.log(response.data))
      .catch((error) => console.log("error", error));
  };
             
  const getCities=async(cityCode)=>{
    const api = `https://api.countrystatecity.in/v1/countries/${global.countryCode}/states/${cityCode}/cities`;

    //https://api.countrystatecity.in/v1/countries/af/states/bdg/cities

    //https://api.countrystatecity.in/v1/countries/IN/states/MH/cities
    // `https://api.countrystatecity.in/v1/countries/IN/states/${state.iso2}/cities`;
    await authAxios
      .get(api)
        .then((response) => setCityList(response.data))
      // .then((response)=>console.log(response.data))
      .catch((error) => console.log("error", error));
  };


// Get Current Location From Device...

const getOneTimeLocation = () => {
  setLocationStatus('Getting Location ...');
  Geolocation.getCurrentPosition(
    //Will give you the current location
    (position) => {
      setLocationStatus('You are Here');

      //getting the Longitude from the location json
      const currentLongitude = 
        JSON.stringify(position.coords.longitude);

      //getting the Latitude from the location json
      const currentLatitude = 
        JSON.stringify(position.coords.latitude);

      //Setting Longitude state
      setCurrentLongitude(currentLongitude);
      
      //Setting Longitude state
      setCurrentLatitude(currentLatitude);
    },
    (error) => {
      setLocationStatus(error.message);
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 1000
    },
  );
};

const subscribeLocationLocation = () => {
  watchID = Geolocation.watchPosition(
    (position) => {
      //Will give you the location on location change
      
      setLocationStatus('You are Here');
      console.log(position);

      //getting the Longitude from the location json        
      const currentLongitude =
        JSON.stringify(position.coords.longitude);

      //getting the Latitude from the location json
      const currentLatitude = 
        JSON.stringify(position.coords.latitude);

      //Setting Longitude state
      setCurrentLongitude(currentLongitude);''

      //Setting Latitude state
      setCurrentLatitude(currentLatitude);
    },
    (error) => {
      setLocationStatus(error.message);
    },
    {
      enableHighAccuracy: false,
      maximumAge: 1000
    },
  );
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={
                  (userContact) => setUserContact(userContact)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={
                  (userAddress) => setUserAddress(userAddress)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <View style={{
                borderWidth: 1,
                justifyContent: "space-around",
                // margin:10,
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#007FFF',
              }}> 
                {/* <Text
              style={{color: '#000', fontFamily: fonts.SEMIBOLD, fontSize: 18}}>
              State
            </Text> */}
                {/* <Picker */}
                <Picker
                  //  label='country'
                  // placeholder={`country`}
                    //  selected={false}
                    // mode="dropdown"
                  selectedValue={country}
                  // style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue) => {
                    setCountry(itemValue);
                    setLoading(true)
                    // placeholder={`SelectCountry`}
                    // defaultValue={global.country}
                    global.countryCode = itemValue;
                    //  global.country="SelectCountry";
                    // value={select}
                    // console.log('coutrycode',itemValue)
                    getStateList(itemValue)
                    // getCities(itemValue)
                  }}
                >
                    <Picker.Item
                  style={{backgroundColor: '#fff',color:"#0087F0"}}
                  label="Select Country"
                  value={0}
                  key={0}
                />
                {countryList?countryList.map((item,index)=> (
              <Picker.Item
              //  placeholder={'Select_Country'}      
                 color="#0087F0"
                // defaultValue='Select'
                label={item.name}
                value={item.iso2}
                // key={index + 1}
              />
                )):null}
              </Picker> 

               </View>
              <View style={{
                borderWidth: 1, height: 50, width: 290,
                justifyContent: "space-around",
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#007FFF',
              }} >

                <Picker
             

                  selectedValue={state}
                  // style={{ height: 50, width: 150 }}
                  // defaultNull={state.country === null}
                  // placeholder="Select your country"
                  onValueChange={(itemValue) => {
                     setState(itemValue)
                     setLoading(true)
                    // console.log('statevalue',itemValue)
                    //  getStateList(itemValue)
                     getCities(itemValue)
                  }

                  }
                >
                  <Picker.Item
                  // style={{backgroundColor: '#fff', color: '#000'}}
                  label="Select State"
                  color="#0087F0"
                  value={0}
                  key={0}
                />
                  {data?data.map((item, index) => (
              <Picker.Item
                color="#0087F0"
                label={item.name}
                value={item.iso2}
                key={index+1}
                // defaultInputValue="Select"
                // iso2= {item.iso2}
                
                  // index={index}
              />
            )):null}
                  
                </Picker>

              </View>
              <View style={{
                borderWidth: 1, height: 50, width: 290,
                justifyContent: "space-around",
                // margin:10,
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#007FFF',
              }} >
                <Picker
                defaultValue={true}
                  selectedValue={city}
                  // style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue) => {

                    setCity(itemValue)
                  
                  }
                    
                  }
                >
                  <Picker.Item
                  // style={{backgroundColor: '#fff', color: '#000'}}
                  label="Select City"
                  color="#0087F0"
                  value={0}
                  key={0}
                />
                  {cityList?cityList.map((item, index) => (

                   
              <Picker.Item
              style={{padding:10,marginLeft:10}}
                color="#0087F0"
                label={item.name}
                // value={item.iso2}
                  value={item.id}
          
                // index={index}

              />
              )):null}
            
                </Picker>
              </View>

        <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              color:'blue',
              fontSize:25,
              // backgroundColor:'black'
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              fontSize:25,
              color:'blue',
              // backgroundColor:'black'
            
            
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{marginTop: 20}}>
            <Button
              title="Button"
              onPress={getOneTimeLocation}
            />
          </View>
        </View>
        {/* <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Native Geolocation
        </Text> */}
        {/* <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text> */}
      </View> 

              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
       
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
});