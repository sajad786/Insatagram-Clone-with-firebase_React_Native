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
import auth from '@react-native-firebase/auth';
import * as validator from 'email-validator';
import * as yup from 'yup';
import { Formik } from 'formik';
import firestore from '@react-native-firebase/firestore';


const SignupForm = ({navigation}) => {
  const SignupFormSchema = yup.object().shape({
    email: yup.string().email().required('An email is required'),
    username: yup.string().required().min(2, 'A username is required '),
    password: yup
      .string()
      .required()
      .min(6, 'your password has to be at least 6 characters'),
  });

  const getRandomProfilePicture = async () =>{
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    return data.results[0].picture.large
  }

  const onSignup = async (email, password, username) =>{
    try {
     const authUser = await auth().createUserWithEmailAndPassword(email, password)
      console.log('firebase user created successfully', email, password)

      firestore().collection('users')
      .doc(authUser.user.email)
      .set({
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_picture: await getRandomProfilePicture(),
      })


      
      // another functio from firestore official 

      // firestore()
      //   .collection('Users')
      //   .get()
      //   .then(querySnapshot => {
      //     console.log('Total users: ', querySnapshot.size);

      //     querySnapshot.forEach(documentSnapshot => {
      //       console.log(
      //         'User ID: ',
      //         documentSnapshot.id,
      //         documentSnapshot.data(),
      //       );
      //     });
      //   });

    } catch (error) {
      Alert.alert('Something went Wrong', error.message)
    }
  }
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', username: '', password: ''}}
        onSubmit={values => {
          onSignup(values.email, values.password, values.username)
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:values.email.length < 1 || validator.validate(values.email)
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Email"
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
                    1 > values.username.length || values.username.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Username"
                autoCapitalize="none"
                textContentType="username"
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
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
            <Pressable
              onPress={handleSubmit}
              titleSize={20}
              style={styles.btn(isValid)}
              disabled={!isValid}>
              <Text style={styles.btnText}>Sign up </Text>
            </Pressable>
            <View style={styles.signUpContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: '#6BB0F5'}}>log in</Text>
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
        paddingLeft:5,
        // padding: 1,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
    },
    btn: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 42,
        borderRadius: 4,
        marginTop:20
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
export default SignupForm;
