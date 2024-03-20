import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


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
    <View style={{ flex:1, alignContent:'center', justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
        <Image source={require('../assets/logo.jpg')} style={{height:responsiveHeight(60), width:responsiveWidth(60)}} />
    </View>
  )
}