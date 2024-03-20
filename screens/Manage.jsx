import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function ManageScreen({ route, navigation }) {
  const { matchData } = route.params;

  const [teamA, setTeamA] = useState(matchData.teamA);
  const [teamB, setTeamB] = useState(matchData.teamB);
  const [stadium, setStadium] = useState(matchData.stadium);
  const [time, setTime] = useState(matchData.time);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  const markDisabledDates = () => {
    let disabledDates = {};
    matches.forEach(match => {
      if (match.time === matchData.time && match.days !== matchData.days) {
        disabledDates[match.days] = { disabled: true, disableTouchEvent: true, dotColor: 'grey' };
      }
    });
    return disabledDates;
  };

  // Function to handle deletion
  const handleDelete = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this match?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const updatedMatches = matches.filter(
                match => !(match.days === matchData.days && match.time === matchData.time)
              );
              setMatches(updatedMatches);
              await AsyncStorage.setItem('matches', JSON.stringify(updatedMatches));
              Alert.alert('Success', 'Match deleted successfully');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting match:', error);
              Alert.alert('Error', 'An error occurred while deleting the match');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // Function to handle modification
  const handleModify = async () => {
    try {
      const updatedMatches = matches.map(match => {
        if (match.days === matchData.days && match.time === matchData.time) {
          return {
            ...match,
            teamA,
            teamB,
            stadium,
            time
          };
        }
        return match;
      });

      setMatches(updatedMatches);
      await AsyncStorage.setItem('matches', JSON.stringify(updatedMatches));
      Alert.alert('Success', 'Match modified successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error modifying match:', error);
      Alert.alert('Error', 'An error occurred while modifying the match');
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: responsiveWidth(4), marginVertical: responsiveHeight(2)}}>
        <View style={{flexDirection:'row', marginVertical:responsiveHeight(1), }}>
            <Text style={{color: 'black', fontSize:responsiveFontSize(2), fontWeight:"500", }}>Manage Matches</Text>
            <View style={{flexDirection:'row', marginLeft:responsiveWidth(28)}}>
                <TouchableOpacity onPress={handleDelete} style={{ marginRight:responsiveWidth(6)}}>
                <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleModify} style={{ }}>
                    <Text style={{ color: 'blue' }}>Modify</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        
        <TextInput value={teamA} onChangeText={setTeamA} style={{borderWidth:1, borderRadius: 8, paddingHorizontal:responsiveWidth(2), marginBottom:responsiveHeight(1), color:'black'}} />
        <TextInput value={teamB} onChangeText={setTeamB} style={{borderWidth:1, borderRadius: 8, paddingHorizontal:responsiveWidth(2), color:'black', marginBottom:responsiveHeight(1)}} />
        <TextInput value={stadium} onChangeText={setStadium} style={{borderWidth:1, borderRadius: 8, paddingHorizontal:responsiveWidth(2), color:'black', marginBottom:responsiveHeight(1)}} />
        <TextInput value={time} onChangeText={setTime} style={{borderWidth:1, borderRadius: 8, paddingHorizontal:responsiveWidth(2), color:'black', marginBottom:responsiveHeight(1)}} />

        <View style={{ marginVertical: responsiveHeight(1), height:responsiveHeight(48) }}>
          <Text style={{ fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(1), color:'black'}}>Select Dates:</Text>
          <Calendar
            markedDates={{ [matchData.days]: { selected: true }, ...markDisabledDates() }}
            theme={{
              // Calendar theme settings...
            }}
            style={{ borderRadius: 10 }}
          />
        </View>
        
        
    </View>
  );
}
