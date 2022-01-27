//import liraries
import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import Video from 'react-native-video';

// create a component

const ReelsScreen = () => {
  const VideoRef = useRef('');

  const onBuffer = e => {
    console.log('Buffering...', e);
  };

  const onError = e => {
    console.log('Error Raised...', e);
  };

  return (
    <View style={{flex: 1}}>
      {/* <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }} // Can be a URL or a local file.
        paused={false}
        ref={VideoRef}
        resizeMode="cover"
        onBuffer={onBuffer} // Callback when remote video is buffering
        onError={onError} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      /> */}

      {/* <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          
        }}
      /> */}

      <Text>hello</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

//make this component available to the app
export default ReelsScreen;
