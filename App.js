
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import Modal from "react-native-modal";
// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const App = () => {

  const [profilePicForPHC,setProfilePicForPHC]=useState();
  const [profile,setProfile]=useState();
  const [picker,setPicker]=useState();
  const[gallery,setGallery]=useState()
  const[visible,setVisible]=useState(false);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfilePicForPHC(image.path)
    }).catch(err => {
      alert("user canclled image...")
      console.log(err)
    })
  }

  const Cameraone = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfile(image.path)
    }).catch(err => {
      console.log(err)
    })
  }

  const Cameratwo = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPicker(image.path)
    }).catch(err => {
      console.log(err)
    })
  }

  const openGallery=()=>{
    
  ImagePicker.openPicker({
    width: 300,
    height: 400,
   // multiple: true
   // cropping: true
  }).then(image => {
    console.log("kiran...............",image);
    setGallery(image.path)
  }).catch(err => {
    console.log(err)
  })
  }
  // ImagePicker.openCamera({
  //   width: 300,
  //   height: 400,
  //   cropping: true,
  // }).then(image => {
  //   console.log(image);
  // });

  const togglepress=()=>{
    setVisible(!visible)
  }

  return(
    <View style={styles.container}>
    <View style={styles.row}>
    <TouchableOpacity 
        onPress={openCamera}
        style={{borderWidth:2, borderColor:'#ccc', height:100, width:100, borderRadius:10}}>
          <Text style={{alignSelf:'center'}}> Image 1</Text>
          
          <Image source={{uri : profilePicForPHC}} style={{height:100, width:100, borderRadius:10, position:'absolute'}}/>
        </TouchableOpacity>
      
    
        {/* <TouchableOpacity 
        onPress={Cameraone}
        style={{borderWidth:2, borderColor:'#ccc', height:100, width:100, borderRadius:10}}>
          <Text style={{textAlign:"center"}}> Image 1</Text>
          
          <Image source={{uri : profile}} style={{height:100, width:100, borderRadius:10, position:'absolute'}}/>
        </TouchableOpacity> */}


        {/* <TouchableOpacity 
        onPress={Cameratwo}
        style={{borderWidth:2, borderColor:'#ccc', height:100, width:100, borderRadius:10}}>
          <Text style={{alignSelf:'center'}}> Image 1</Text>
          
          <Image source={{uri : picker}} style={{height:100, width:100, borderRadius:10, position:'absolute'}}/>
        </TouchableOpacity> */}

     
 <View>
 <TouchableOpacity 
        onPress={openGallery}
        style={{borderWidth:2, borderColor:'#ccc', height:100, width:100, borderRadius:10}}>
          <Text style={{alignSelf:'center'}}> Gallery Image </Text>
          
          <Image source={{uri : gallery}} style={{height:100, width:100, borderRadius:10, position:'absolute'}}/>
        </TouchableOpacity>
 </View>

        </View>
        <View>
        <Button title="Show modal" onPress={togglepress} />
        <Modal isVisible={visible}
           //animationType={'slide'}
           transparent={true}
           //animationType={"slide"}
           style={{  margin: 0, alignItems: 'center', justifyContent: 'center' }}
           //style={{backgroundColor:"white"}}
         // style={{width: Dimensions.get('window').width * 0.5, height: Dimensions.get('window').height * 0.5}}
        >
        <View  style={{
          height: 300,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
       
          <Text>I am the modal content!</Text>
          <Button title='HideModel'
             onPress={togglepress}
          />
      
        </View>
      </Modal>
      </View>

        </View>
  )
};
 
export default App;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    justifyContent:'center',
   // backgroundColor: 'black',
    alignItems: 'center',
  },
  // titleText: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   paddingVertical: 20,
  // },
  // textStyle: {
  //   padding: 10,
  //   color: 'black',
  // },
  // buttonStyle: {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   backgroundColor: '#DDDDDD',
  //   padding: 5,
  // },
  // imageStyle: {
  //   width: 200,
  //   height: 200,
  //   margin: 5,
  // },
  row:{
    flexDirection:'row',
    //  padding:10,
    width:"98%",
    justifyContent:"space-around"
  }
});