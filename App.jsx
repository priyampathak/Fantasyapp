import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Add from './screens/Add'
import Splash from './screens/Splash'
import Aftersplash from './screens/Aftersplash'
import Manage from './screens/Manage'

export default function App() {
  const stack = createNativeStackNavigator()
  return (
    <>
      <NavigationContainer>
        <stack.Navigator initialRouteName='Splash'>
          <stack.Screen name='Splash' component={Splash} options={{ headerShown: false }}/>
          <stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
          <stack.Screen name="Aftersplash" component={Aftersplash} options={{headerShown: false}} />
          <stack.Screen name='Add' component={Add}/>
          <stack.Screen name='Manage' component={Manage} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  )
}