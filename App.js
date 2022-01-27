import React,{useEffect} from 'react'
import { View, Text, } from 'react-native'
import AuthNavigation from './AuthNavigation'
// import AuthNavigation from './authNavigation'
import SignedInStack from './navigation'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import SplashScreen from "react-native-splash-screen"; //splashscreen 




const App = () => {

    //Hide Splash screen on app load.
    useEffect(() => {
        SplashScreen.hide();
    });
    
    return(
        <>
            <AuthNavigation/>
        </>
    )
}
   

export default App