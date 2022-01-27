import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import {color} from 'react-native-elements/dist/helpers';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/windows/50/000000/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/fluency/50/000000/like.png',
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/ios/50/000000/topic.png',
  },
  {
    name: 'Share',
    imageUrl:
      'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-send-email-flatart-icons-outline-flatarticons.png',
  },
  {
    name: 'Save',
    imageUrl:
      'https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon--v2.png',
    savedImageUrl:'https://img.icons8.com/material-sharp/24/000000/bookmark-ribbon--v1.png',
  },
];

const Post = ({post}) => {
  const handleLike = post => {
    const currentLikeStatus = !post.likes_by_users.includes(
      auth().currentUser.email
    )

    firestore().collection('users')
    .doc(post.owner_email)
    .collection('posts')
    .doc(post.id)
    .update({
      likes_by_users: currentLikeStatus ? firestore.FieldValue.arrayUnion(
        auth().currentUser.email) :firestore.FieldValue.arrayRemove(
        auth().currentUser.email
      ),
    })
    .then(()=>{console.log('document successfully updated');})
    .catch((error)=>{console.error(error)})
  }
  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter postFooterIcons={postFooterIcons} post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({post}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={styles.postsPicture} source={{uri: post.profile_picture}} />
      <Text style={{color: 'white', marginLeft: 5, fontWeight: '700'}}>
        {post.user}
      </Text>
    </View>

    <Text style={{color: 'white', fontWeight: '900'}}> ... </Text>
  </View>
);

const PostImage = ({post}) => (
  <View style={{height: 450, width: '100%'}}>
    <Image
      source={{uri: post.imageUrl}}
      style={{height: '100%', resizeMode: 'cover'}}
    />
  </View>
);

const PostFooter = ({postFooterIcons, handleLike, post}) => (
  <View style={{flexDirection: 'row'}}>
    <View style={styles.leftFooterIcons}>
      <TouchableOpacity 
      // onPress={()=>handleLike(post)} 
      >
      <Image style={styles.footerIcon} source={{uri :
      // post.likes_by_users.includes(auth().currentUser.email 
      //   ? postFooterIcons[0].likedImageUrl 
      //   : 
        postFooterIcons[0].imageUrl, 
      }} />
      </TouchableOpacity>
      {/* <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} /> */}
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon
        imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View style={{flex:1, alignItems:'flex-end'}}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({imgStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{uri: imgUrl}} />
  </TouchableOpacity>
);

const Likes = ({post}) => (
  <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color: 'white', fontWeight: '600'}}> {post.likes_by_users.length.toLocaleString('en-IN')} Likes
    </Text>
  </View>
);

const Caption = ({post}) => (
  <View style={{marginTop:5}}>
    <Text style={{color: 'white'}}>
      <Text style={{fontWeight: '600'}}>{post.user} </Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({post}) => (
  <View style={{marginTop: 5}}>
    {post.comments.length > 1 ? (
      <Text style={{color: 'gray'}}>
        View {post.comments.length > 1 ? 'all' : ' '} {''}
        {post.comments.length} {''}
        {post.comments.length > 1 ? 'Comments' : 'Comment'}
      </Text> 
    ) : false}
  </View>
);


const Comments = ({post}) => (
  <>
    {post.comments.map((comments, index)=>(
      <View key={index} style={{flexDirection:'row', marginTop:5}} >
        <Text style= {{ color:'white' }}>
          <Text style={{fontWeight:'600'}}>{comments.user} </Text> {''}
          {comments.comment}
        </Text>
      </View>
    ))}
  </>
)



const styles = StyleSheet.create({
  postsPicture: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 33,
    height: 33,
    tintColor: 'white',
  },
  leftFooterIcons:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'32%'
  },
  shareIcon:{
    // transform:[{rotate:'30deg'}],
    marginTop:1,
  }
});

export default Post;
