import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
// import Stories from '../components/Stories'
import { POSTS } from '../data/posts'
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    firestore().collectionGroup('posts')
    // .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post=> ({id: post.id, ...post.data()})))
    })
  }, [])

    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <Stories />
        <ScrollView>
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </ScrollView>
        <BottomTabs icons={bottomTabIcons} />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',

  },
});

export default HomeScreen 


