import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Splash({ navigation }) {
    const [uname, setUname] = useState('user');

 
    const getdata = async () => {
      try {
        const name = await AsyncStorage.getItem("name");
        if (name == null) {
            navigation.navigate('Aftersplash'); 
        }else {
            navigation.navigate('Home');
          }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };
  
    useEffect(() => {
        const timer = setTimeout(() => {
            getdata();
        }, 3000); 
        return () => clearTimeout(timer); 
      }, [navigation]); 
    
  return (
    <View>
      <Text>Splash</Text>
    </View>
  )
}