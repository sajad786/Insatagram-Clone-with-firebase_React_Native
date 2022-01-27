import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
// import {USERS} from '../../data/users';
import {USERS} from '../../data/users'


const Stories = () => {
  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{alignItems:'center'}}>
            <Image style={styles.stories} source={{uri: story.Image}} />
            <Text style={{color:'white'}}>{
            story.user.length>11 ? story.user.slice(0,6).toLowerCase() + '...' 
            : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  stories: {
    width: 70,
    height: 70,
    borderRadius:50,
    marginLeft:8,
    borderWidth:3,
    borderColor:"#ff8501"
  },
});

export default Stories;
