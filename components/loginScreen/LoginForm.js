import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as validator from 'email-validator';
import * as yup from 'yup';
import {Formik} from 'formik';
// import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';


const LoginForm = ({navigation}) => {
  const LoginFormSchema = yup.object().shape({
    email: yup.string().email().required('An email is required'),
    password: yup
      .string()
      .required()
      .min(6, 'your password has to be at least 6 characters'),
  });

  const onLogin = async (email, password) => {
    try {
      // await firebase.auth().signInWithEmailAndPassword(email, password)
      await auth().signInWithEmailAndPassword(email, password)
      console.log('firebase Login successful', email, password)
    } catch (error) {
      Alert.alert(
        'Something went wrong ',
        error.message + '\n \n what would you like to do next ',
        [
         { text :'ok',
          onPress: ()=> console.log('OK'),
          style:'cancel'
        },
        {text:'sign Up ', 
        onPress:() => navigation.push('signupScreen')
        }
        ]

      )
    }
  }


  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email:'', password:''}}
        onSubmit={values => {
         onLogin(values.email, values.password)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || validator.validate(values.email)
                      ? '#ccc' : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone Number, username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View style={{alignItems: 'flex-end', marginBottom: 30}}>
              <Text style={{color: '#6BB0F5'}}>Forgot Password?</Text>
            </View>
            <Pressable
              onPress={handleSubmit}
              titleSize={20}
              style={styles.btn(isValid)}
              disabled={!isValid}>
              <Text style={styles.btnText}>Log in </Text>
            </Pressable>
            <View style={styles.signUpContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('signupScreen')}>
                <Text style={{color: '#6BB0F5'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 1,
    paddingLeft: 5,
    // padding: 1,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  btn: isValid => ({
    backgroundColor: isValid ? '#0096F6':'#9ACAF7',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  btnText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});
export default LoginForm;
