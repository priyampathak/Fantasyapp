import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [uname, setUname] = useState('user');
  const [matches, setMatches] = useState([]);
  const [upc, setUpc] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      const existingMatches = await AsyncStorage.getItem('matches');
      if (existingMatches) {
        setMatches(JSON.parse(existingMatches));
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const name = await AsyncStorage.getItem(`name`);
        if (name !== null) {
          setUname(name);
          console.log(name);
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    getdata();
  }, []);

  useEffect(() => {
    if (matches.length > 0) {
      const currentDate = new Date();
      const sortedMatches = [...matches].sort((a, b) => {
        const dateA = new Date(a.days + ' ' + a.time);
        const dateB = new Date(b.days + ' ' + b.time);
        return dateA - dateB;
      });
      const upcomingMatch = sortedMatches.find(match => {
        const matchDate = new Date(match.days + ' ' + match.time);
        return matchDate > currentDate;
      });
      setUpc(upcomingMatch);
      if (upcomingMatch != null) {
        console.log('Closest upcoming match:', upcomingMatch.days);
      }
    }
  }, [matches]);

  const handleItemPress = item => {
    navigation.navigate('Manage', { matchData: item });
  };

  return (
    <View style={{ marginHorizontal: responsiveWidth(6), marginVertical: responsiveHeight(0) }}>
      <View style={{ flexDirection: 'row', marginVertical: responsiveHeight(2), justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ height: responsiveHeight(5), width: responsiveWidth(40), justifyContent: 'center', alignItems: 'left', borderRadius: 8, marginRight: responsiveWidth(2) }}
        >
          <Text style={{ color: 'black' }}>Hello, {uname}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#714EF8', height: responsiveHeight(5), width: responsiveWidth(16), justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}
          onPress={() => {
            navigation.navigate('Add');
          }}
        >
          <Text style={{ color: 'white' }}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: 'black', fontWeight: '500' }}>Match Day</Text>
      <View
        style={{
          height: responsiveHeight(22),
          backgroundColor: '#3854DC',
          borderRadius: 10,
          paddingVertical: responsiveHeight(1),
          paddingHorizontal: responsiveWidth(6),
          marginVertical: responsiveHeight(2)
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center', marginBottom: responsiveHeight(2), fontWeight: '800' }}>
          {upc?.days ?? 'Date'}
        </Text>
        <View style={{ flexDirection: 'row', marginBottom: responsiveHeight(0.4) }}>
          <Text style={{ flex: 1, color: 'white', fontWeight: '800' }}>Team A</Text>
          <Text style={{ textAlign: 'right', color: 'white', fontWeight: '800' }}>Team B</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(5) }}>
          <Text style={{ color: 'white', fontWeight: '200', width: responsiveWidth(20) }}>{upc?.teamA ?? 'Name of A'}</Text>
          <Text style={{ textAlign: 'right', color: 'white', fontWeight: '200', width: responsiveWidth(26) }}>
            {upc?.teamB ?? 'Name of B'}
          </Text>
        </View>
        <View style={{ paddingVertical: responsiveHeight(1.5) }}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: '300' }}>{upc?.stadium ?? ''}</Text>
          <Text style={{ textAlign: 'center', color: 'white', fontStyle: 'italic', fontWeight: '800' }}>
            {upc?.time ?? ''} onwards
          </Text>
        </View>
      </View>
      <View style={{ height: responsiveHeight(60), marginHorizontal: responsiveWidth(0.2) }}>
        <Text style={{ fontSize: responsiveFontSize(2), color: 'black', marginTop: responsiveHeight(2) }}>Upcoming Matches</Text>
        <FlatList
          data={matches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={{ borderWidth: 1, marginVertical: responsiveHeight(1), padding: responsiveWidth(2), borderRadius: 5 }}>
                <Text style={{ color: 'black' }}>{`Team A: ${item.teamA}`}</Text>
                <Text style={{ color: 'black' }}>{`Team B: ${item.teamB}`}</Text>
                <Text style={{ color: 'black' }}>{`Date: ${item.days}`}</Text>
                <Text style={{ color: 'black' }}>{`Time: ${item.time}`}</Text>
                <Text style={{ color: 'black' }}>{`Stadium: ${item.stadium}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
