import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import EditBook from '../screens/EditBook'
import GetBook from '../screens/GetBook'
import CreateBook from '../screens/CreateBook'

const Stack = createStackNavigator()

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"CreateBook"} component={CreateBook} />
        <Stack.Screen name={"AllBook"} component={GetBook} />
        <Stack.Screen name={"EditBook"} component={EditBook} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router