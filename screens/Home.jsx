import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home({ navigation }) {
  const [uname, setUname] = useState('user');

  useEffect(() => {
    const getdata = async () => {
      try {
        const name = await AsyncStorage.getItem(`name`);
        if (name !== null) {
          setUname(name);
          console.log(name)
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    getdata();
  }, []);

  return (
    <View style={{marginHorizontal:responsiveWidth(6), marginVertical:responsiveHeight(2)}}>
        <View style={{flexDirection:'row', marginVertical:responsiveHeight(2), justifyContent:'space-between'}}>
            <TouchableOpacity style={{height:responsiveHeight(5), width:responsiveWidth(40), justifyContent: 'center', alignItems: 'left', borderRadius:8, marginRight:responsiveWidth(2)}}>
                <Text style={{color:'black'}}>
                   Hello, {uname}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#714EF8', height:responsiveHeight(5), width:responsiveWidth(16), justifyContent: 'center', alignItems: 'center', borderRadius:8,}} onPress={()=>{navigation.navigate('Add')}}>
                <Text style={{color:'white'}}>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
        <Text style={{color:'black', fontWeight:'500'}}>
            Match Day
            </Text>
        <View style={{height:responsiveHeight(22), backgroundColor:'#3854DC', borderRadius:10, paddingVertical:responsiveHeight(1),
                paddingHorizontal:responsiveWidth(6), marginVertical:responsiveHeight(2)}}>
            <Text style={{color:'white', textAlign:'center', marginBottom:responsiveHeight(2), fontWeight:'800'}}>
                17 Mar
            </Text>
            <View style={{flexDirection:'row', marginBottom:responsiveHeight(0.4)}}>
                <Text style={{flex:1, color: 'white', fontWeight:'800'}}>
                    Team A
                </Text>
                
                <Text style={{textAlign:'right', color: 'white', fontWeight:'800'}}>
                    Team B
                </Text>   
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', }}>
                <Text style={{ color: 'white', fontWeight:'200', width:responsiveWidth(20),}}>
                    Mumbai Indians
                </Text>
                
                <Text style={{textAlign:'right', color: 'white', fontWeight:'200', width:responsiveWidth(20)}}>
                    Lucknow Supergiants
                </Text>   
            </View>
            <View style={{paddingVertical:responsiveHeight(1.5)}}>
                <Text style={{textAlign:'center', color:'white', fontWeight:'300'}}>
                    Wankhede Stadium Mumbai
                </Text>
                <Text style={{textAlign:'center', color:'white', fontStyle:'italic', fontWeight:'800'}}>
                    3:00 PM onwards
                </Text>
            </View>
        </View>
        <View>
            <Text style={{color:'black', fontWeight:'500'}}>
                Upcoming Matches
            </Text>
        </View>
    </View>
  )
}
