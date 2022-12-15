import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
 import { NavigationContainer } from '@react-navigation/native'
import CreateVerse from "../screens/CreateVerse"
import GetAllVerse from "../screens/GetAllVerse"
import EditVerse from '../screens/EditVerse'

 const Stack = createStackNavigator()

 const Router = () =>{
       return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name={"CreateVerse"} component= {CreateVerse}  />
            <Stack.Screen name={"AllVerse"} component= {GetAllVerse}  />
            <Stack.Screen name={"EditVerse"} component= {EditVerse}  />
        </Stack.Navigator>
     </NavigationContainer>
       )
 }

 export default Router