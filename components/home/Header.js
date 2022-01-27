import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';

const handleSignout = async () => {
  try {
    await auth().signOut()
    console.log('signed out successfully! ')
  } catch (error) {
    console.log(error)
  }
}

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignout}>
        <Image
          style={styles.logo}
          source={require('../../assets/instagramLogo.png')}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')} style={{ paddingLeft: 5 }}>
          <Image
            style={styles.icon}
            source={require('../../assets/addBox.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ paddingLeft: 5 }}>
          <Image
            style={styles.icon}
            source={require('../../assets/heart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 5 }}>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText} >11</Text>
          </View>
          <Image
            style={styles.icon}
            source={require('../../assets/message.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 6,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 30,
    height: 30,
    paddingLeft: 5,
  },
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: 'absolute',
    left: 20,
    bottom: 18,
    width: 25,
    height: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',

  },
});

export default Header
