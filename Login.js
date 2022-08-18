import  { useState } from 'react';
import { View, TextInput, StyleSheet, Text,TouchableOpacity ,Button} from 'react-native';
// import { Button } from 'react-native-paper';
import * as React from 'react';
// import { Navigation } from 'react-native-navigation';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup'
// import Register from './src/Register';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Login() {


    const navigation=useNavigation();

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const loginValidationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Email Address is Required'),
        password: yup
          .string()
          .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required('Password is required'),
      })

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>MyApp</Text>
            </View>
            <Formik 
                  initialValues={{ email: '',
                   password: '' }}
                  validationSchema={loginValidationSchema}
                        
               onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleSubmit, values,errors, touched})=>(
                <>
            <View>
                <TextInput
                    style={styles.TextInput}
                    placeholder=" Enter Email"
                    value={values.email}
                    // placeholderTextColor="#003f5c"
                    // onChangeText={(email) => setEmail(email)}
                    onChangeText={handleChange('email')}
                />
                 {(errors.email && touched.email)&&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder= "Enter Password"
                    // placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    value={values.password}
                    // onChangeText={(password) => setPassword(password)}
                    onChangeText={handleChange('password')}
                />
                 {(errors.password && touched.password)&&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
            </View>
            {/* <View>
            {/* onPress={() => console.log('Pressed')} */}
                {/* <Button  mode="contained">
                    Press me
                </Button> */}
            {/* </View> */} 
            {/* <Button  mode="contained" >
               Press me
              </Button> */}
              {/* <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.login}>
                      Login
                  </Text>
                  
              </TouchableOpacity> */}
              <View  style={styles.Login}>
               <Button 
               onPress={handleSubmit}
               title="LOGIN"
            //    disabled={!isValid}
       />
       </View>
              <TouchableOpacity   onPress={() =>navigation.navigate("Register")}  >
              <Text style={styles.Register} >Register</Text>
              </TouchableOpacity>
            </>
        )}
              </Formik>  
        </View>

    );
}

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        //     border:1,
        //   borderWidths:1,
        //   height: 50,
        //   flex: 1,
        //   padding: 10,
        //   marginLeft: 20,
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'white'
    },
    Login:{
    width:70,
    marginLeft:220

    },
    inputView: {
        // borderWidth:1,
        // border:1
        //     height: 40,
        //     margin: 12,
        //     borderWidth: 1,
        //     padding: 10,
        // }
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
        color: 'black'
    },
    login:{
        fontSize:20,
        marginLeft:180,
        marginTop:20,
        // borderWidth:1,
        // width:100,
        textAlign:'center',
        fontWeight:'bold',
       color:'red'
        // text-decoration:'underline'
        // textdecoration: 'underline',
        // alignContent:'center',
        // justifyContent:'center'
        // text-decoration: 'underline


    },
    Register:{
        fontSize:20,
        marginRight:180,
        marginTop:-30,
         borderWidth:1,
        // width:100,
        padding:10,
        textAlign:'center',
        fontWeight:'bold',
         backgroundColor:"pink",
        color:'blue'
    }
    // Touch:{
    //     alignItems:'center',
    //       justifyContent:'center'
    // }
})