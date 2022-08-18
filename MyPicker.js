import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const MyPicker = (props) => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: '#007FFF',
        borderWidth: 1,
      }}>
      {/* <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#007FFF"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        // onValueChange={props.onValueChange}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      /> */}
      <Picker
           onValueChange={props.onValueChange}
           selectedValue={props.selectedValue}
           style={props.style}
           onSubmitEditing={props.onSubmitEditing}
           blurOnSubmit={false}
           underlineColorAndroid="transparent"
           placeholderTextColor="#007FFF"
      >
          
        

        </Picker>
    </View>
  );
};

export default MyPicker;