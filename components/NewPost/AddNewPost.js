import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import FormicPostUploader from './FormicPostUploader';

const AddNewPost = ({ navigation}) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <FormicPostUploader navigation={navigation}/>
  </View>
);


    const Header = ({navigation}) =>(

        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image
              source={require('../../assets/LeftArrow.png')}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}> NEW POST</Text>
          <Text/>
        </View>
    )


const  styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
        marginTop:5,
    },
    headerContainer : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerText:{
        color:'#fff',
        fontWeight:'700',
        fontSize:20,
        marginRight:25,
    },
})
export default AddNewPost;
