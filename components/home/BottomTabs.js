import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';

export const bottomTabIcons = [
  {
    name: 'Home',
    active: 'https://img.icons8.com/material-rounded/50/000000/home.png',
    inactive: 'https://img.icons8.com/material-outlined/50/000000/home--v2.png',
  },
  {
    name: 'Search',
    active: 'https://img.icons8.com/ios-glyphs/50/000000/search--v1.png',
    inactive: 'https://img.icons8.com/ios/50/000000/search--v1.png',
  },
  {
    name: 'Reels',
    active: 'https://img.icons8.com/ios-filled/50/000000/instagram-reel.png',
    inactive: 'https://img.icons8.com/ios/50/000000/instagram-reel.png',
  },
  {
    name: 'Shop',
    active: 'https://img.icons8.com/ios-glyphs/50/000000/like--v1.png',
    inactive: 'https://img.icons8.com/material-outlined/50/000000/like--v1.png',
  },
  {
    name: 'Profile',
    active:
      'https://i.pinimg.com/236x/c5/c6/3c/c5c63c1cc5bfca51ffc0ceb705dbd553.jpg',
    inactive:
      'https://i.pinimg.com/236x/c5/c6/3c/c5c63c1cc5bfca51ffc0ceb705dbd553.jpg',
  },
];

const BottomTabs = ({icons}) => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('Home');

  // const Reels = icon => {
  //   if (icon.name == 'Reels') {
  //     setActiveTab(icon.name);
  //     navigation.navigate('ReelsScreen');
  //   } else {
  //     setActiveTab(icon.name);
  //   }
  // };

  const Reels = icon => {
    switch (icon.name) {
      case 'Reels':
        setActiveTab(icon.name);
        navigation.navigate('ReelsScreen');
        break;
      case 'Home':
        setActiveTab(icon.name);
        // navigation.navigate('ReelsScreen');
        break;
      case 'Search':
        setActiveTab(icon.name);
        // navigation.navigate('ReelsScreen');
        break;
      case 'Shop':
        setActiveTab(icon.name);
        // navigation.navigate('ReelsScreen');
        break;
      case 'Profile':
        setActiveTab(icon.name);
        // navigation.navigate('ReelsScreen');
        break;
      default:
        break;
    }
  };

  const Icon = ({icon}) => (
    <TouchableOpacity onPress={() => Reels(icon)}>
      <Image
        source={{uri: activeTab === icon.name ? icon.active : icon.inactive}}
        style={[
          icon.name === 'Profile' ? styles.inActiveProfilePic : styles.icon,
          activeTab === 'Profile' && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : styles.profilePic,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: '0%',
    zIndex: 999,
    backgroundColor: '#000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'white',
    // backgroundColor:'white'
  },
  inActiveProfilePic: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  profilePic: (activeTab = ' ') => ({
    borderWidth: activeTab === 'Profile' ? 2 : 0,
    borderRadius: 50,
    borderColor: '#fff',
  }),
});

export default BottomTabs;
