import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import ValidUrl from 'valid-url';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const PLACEHOLDER_IMG =
  'https://www.hhireb.com/wp-content/uploads/2019/08/default-no-img.jpg';

const uploadPostSchema = yup.object().shape({
  // imageUrl: yup.string().url().required('A Url is required'),
  caption: yup.string().max(2200, 'Caption has reached the character'),
});

const FormicPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [pickUri, setPickUri] = useState('');
  const [caption, setCaption] = useState('');

  //  firestore()
  //    .collectionGroup('posts')
  //    // .orderBy('createdAt', 'desc')
  //    .onSnapshot(snapshot => {
  //      setPosts(snapshot.docs.map(post => ({id: post.id, ...post.data()})));
  //    });

  const getUserName = () => {
    const user = auth().currentUser._user;
    console.log(user, 'userrrrrr');
    const unsubscribe = firestore()
      .collection('users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      // .onSnapshot(snap => {
      //   const data = snap.docs.map(doc => doc.data().username);
      //   console.log(data, 'lets see data ');
      // });
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          console.log(doc.data(), 'docccccc');
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        }),
      );

    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
    console.log(currentLoggedInUser, 'user');
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    console.log('inside fnc', imageUrl, caption);
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('posts')
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: auth().currentUser.uid,
        owner_email: auth().currentUser.email,
        caption: caption,
        createdAt: firestore.FieldValue.serverTimestamp(),
        // likes:0,
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());
    return unsubscribe;
  };

  const onUpload = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      console.log('Responses = ', response);
      const pic = response.assets[0].uri;
      setPickUri(pic);
      console.log(pic, 'picccc');
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker errror:', response.error);
      } else if (response.customButton) {
        console.log('Image customed button tapped:', response.customButton);
      } else {
        let source = response;
        // let source = {uri: 'data:image/jpeg;base64,' + response.uri};

        // const source = {uri: 'data:image/jpeg;base64,' + response.base64};
        console.log('image path ======', source);
        setImageUri(source);
      }
    });
  };

  return (
    <Formik
      initialValues={{caption: '', pickUri}}
      onSubmit={values => uploadPostToFirebase(pickUri, values.caption)}
      validationSchema={uploadPostSchema}
      validateOnMount={true}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: pickUri ? pickUri : PLACEHOLDER_IMG}}
              style={{width: 100, height: 100}}
            />
            <View style={{flex: 1, margin: 12}}>
              <TextInput
                style={{color: '#fff', fontSize: 20}}
                placeholder="Write Caption... "
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={text => setCaption(text)}
                // onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          {/* <TextInput
            style={{color: '#fff', fontSize: 18}}
            placeholder="Enter Image url"
            placeholderTextColor="gray"
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
          />
          {errors.imageUrl && (
            <Text style={{color: 'red', fontSize: 10}}>{errors.imageUrl}</Text>
          )} */}

          <View style={{marginVertical: 10}} />
          <Button
            onPress={() => {
              // alert('pressed');
              onUpload();
            }}
            title="Upload"
          />
          <View style={{marginVertical: 10}} />

          <Button
            onPress={() => uploadPostToFirebase(pickUri, caption)}
            title="Share"
            disabled={!isValid}
          />
          <View style={{marginVertical: 10}} />
          {/* <View>
            <Image
              source={{
                uri: pickUri ? pickUri : PLACEHOLDER_IMG,
              }}
              style={{width: 100, height: 100}}
            />
          </View> */}
        </>
      )}
    </Formik>
  );
};

export default FormicPostUploader;
