import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Aftersplash({ navigation }) {
    const [name, setName] = useState('')
    function pressing() {
        const setData = async()=>{
            await AsyncStorage.setItem(`name`, JSON.stringify(name))
            } 
        setData() 
        navigation.navigate('Home')           
    }
  return (
    <View style={{marginHorizontal:responsiveWidth(6), marginVertical:responsiveHeight(6)}}>
        <Text style={{color:'black', fontSize:responsiveFontSize(4)}}>
            Hello,
        </Text>
        <Text style={{color:'black', fontSize:responsiveFontSize(3)}}>
            Tell us about yourself
        </Text>
        <TextInput style={{borderWidth:1, borderRadius:6, paddingHorizontal:responsiveWidth(4), marginVertical:responsiveHeight(4)}} placeholder='First Name'
        onChangeText={(e)=>setName(e)}>
            
        </TextInput>
        <TouchableOpacity style={{backgroundColor:'#3854DC', height:responsiveHeight(5), width:responsiveWidth(22), justifyContent: 'center', alignItems: 'center', borderRadius:8,}}>
            <Text style={{color:'white'}} onPress={()=>{pressing()}}>
                NEXT
            </Text>
        </TouchableOpacity>
    </View>
  )
}