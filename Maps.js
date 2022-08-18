import React, { Component } from 'react';  
import { StyleSheet, View } from 'react-native';  
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
  
export default class App extends Component {  
  render() {  
    return (  
      <View>  
  
        <MapView  
          showsUserLocation={false}  
          zoomEnabled={true}  
          zoomControlEnabled={true}  
          initialRegion={{  
            latitude: 28.579660,   
            longitude: 77.321110,  
            
          }}>  
  
          <Marker  
            coordinate={{ latitude: 28.579660, longitude: 77.321110 }}  
           
          />  
        </MapView>  
          
      </View>  
    );  
  }  
}  