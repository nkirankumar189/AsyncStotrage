import {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
// import { Button } from 'react-native-paper';
import * as React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
function Register() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [phonenumber,setPhoneNumber]=useState("");

  //  console.log("hello")

  const signUpValidationSchema = yup.object().shape({
    name: yup
      .string()
      //   .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    phonenumber: yup
      .string()
      //   .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone Number is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    password: yup
      .string()
      //   .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      //   .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      //   .matches(/\d/, "Password must have a number")
      //   .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    // confirmPassword: yup
    // .string()
    // .oneOf([yup.ref('password')], 'Passwords do not match')
    // .required('Confirm password is required'),
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>MyApp</Text>
      </View>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phonenumber: '',
          password: '',
          // confirmPassword: '',
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={values => console.log(values)}>
        {({handleChange, values, touched, errors, handleSubmit}) => (
          <>
            <View>
              <Text style={styles.name}>Name</Text>
              <TextInput
                style={styles.TextInput}
                placeholder=" Enter The Name"
                value={values.name}
                // placeholderTextColor="#003f5c"
                // onChangeText={(name) => setName(name)}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
              )}
            </View>
            <View>
              <TextInput
                style={styles.TextInput}
                placeholder=" Enter The Phonenumber"
                value={values.phonenumber}
                keyboardType="numeric"
                // placeholderTextColor="#003f5c"
                // onChangeText={(phonenumber) => setPhoneNumber(phonenumber)}
                onChangeText={handleChange('phonenumber')}
              />
              {errors.phonenumber && touched.phonenumber && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.phonenumber}
                </Text>
              )}
            </View>
            <View>
              <TextInput
                style={styles.TextInput}
                placeholder=" Enter Email"
                value={values.email}
                // placeholderTextColor="#003f5c"
                onChangeText={handleChange('email')}
              />
              {errors.email && touched.email && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder=" Enter Password"
                // placeholderTextColor="#003f5c"
                secureTextEntry={true}
                value={values.password}
                // onChangeText={(password) => setPassword(password)}
                onChangeText={handleChange('password')}
              />
              {errors.password && touched.password && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.password}
                </Text>
              )}
            </View>
            {/* <TouchableOpacity style={styles.touch}>
                  <Text style={styles.login}>
                     Sumbit
                  </Text>

              </TouchableOpacity> */}
            <View style={styles.signup}>
              <Button
                onPress={handleSubmit}
                title="SIGN UP"
                //   disabled={!isValid}
              />
            </View>
            {/* <TouchableOpacity>
              <Text style={styles.Register} >Register</Text>
              </TouchableOpacity> */}
          </>
        )}
      </Formik>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  signup: {
    width: 70,
    marginLeft: 220,
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
    backgroundColor: 'white',
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
    color: 'black',
  },
  login: {
    // flex:1,
    fontSize: 20,
    marginLeft: 180,
    marginRight: 10,
    marginTop: 20,
    // borderWidth:1,
    borderRadius: 12,
    // elevation:1,
    //width:120,
    height: 40,
    padding: 5,
    // justifyContent:'space-around',
    alignItems: 'center',
    textAlign: 'center',
    //  justifyContent:'space-around',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'blue',
  },
  Register: {
    fontSize: 20,
    marginRight: 180,
    marginTop: -30,
    // borderWidth:1,
    // width:100,
    textAlign: 'center',
    fontWeight: 'bold',
    // backgroundColor:"pink",
    color: 'blue',
  },
  name:{
    marginLeft:15,
    fontWeight:"bold"
  }
  // touch:{
  //     // flex:1,
  //     alignItems:'center',
  //       justifyContent:'center'
  // }
});
