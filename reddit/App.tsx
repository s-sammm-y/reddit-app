import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./src/components/Header"
import Footer from "./src/components/Footer"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View ,StyleSheet} from "react-native";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer >
      <SafeAreaView style={styles.container}>
      <Header/>

      <View style={styles.middle}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
      </View>
      
      </SafeAreaView>
       <Footer/>
    </NavigationContainer>
  )
}


  const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    middle:{
      flex:1,
      backgroundColor:"black"
    }
  })