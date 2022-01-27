import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LoginForm from '../components/loginScreen/LoginForm';
import SignupForm from '../components/SignupScreen/SignupForm';

const INSTAGRAM_LOGO =
    'https://brandlogos.net/wp-content/uploads/2016/06/Instagram-logo.png';

const signupScreen = ({navigation}) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image source={{uri: INSTAGRAM_LOGO, height: 100, width: 100}} />
    </View>
    <SignupForm navigation={navigation} />
  </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTopP: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    }
});
export default signupScreen
