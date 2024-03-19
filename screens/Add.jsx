import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function Add() {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTime, setSelectedTime] = useState('');
  const [stadium, setStadium] = useState('');
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
      if (match.time === selectedTime) {
        disabledDates[match.days] = { disabled: true, disableTouchEvent: true, dotColor: 'grey' };
      }
    });
    return disabledDates;
  };

  const handleAddMatch = async () => {
    try {
      const newMatches = Object.keys(selectedDates).map(dateString => ({
        teamA,
        teamB,
        days: dateString,
        time: selectedTime,
        stadium
      }));

      const updatedMatches = [...matches, ...newMatches];
      setMatches(updatedMatches);

      await AsyncStorage.setItem('matches', JSON.stringify(updatedMatches));

      setTeamA('');
      setTeamB('');
      setSelectedDates({});
      setSelectedTime('');
      setStadium('');
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: responsiveWidth(4), marginVertical: responsiveHeight(2) }}>
        <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Add Match Details</Text>
        <TextInput
          placeholder='Team A name'
          style={{ borderWidth: 1, marginBottom: responsiveHeight(1), borderRadius: 5, color:'black' }}
          value={teamA}
          onChangeText={setTeamA}
          placeholderTextColor='grey'
        />
        <TextInput
          placeholder='Team B name'
          style={{ borderWidth: 1, marginBottom: responsiveHeight(1), borderRadius: 5, color:'black' }}
          value={teamB}
          onChangeText={setTeamB}
          placeholderTextColor='grey'
        />
        <TextInput
          placeholder='Stadium'
          style={{ borderWidth: 1, marginBottom: responsiveHeight(1), borderRadius: 5, color:'black'}}
          value={stadium}
          onChangeText={setStadium}
          placeholderTextColor='grey'
        />
        <TextInput
          placeholder='Time'
          style={{ borderWidth: 1, marginBottom: responsiveHeight(1), borderRadius: 5, color:'black' }}
          value={selectedTime}
          onChangeText={setSelectedTime}
          placeholderTextColor='grey'
        />
        <View style={{ marginVertical: responsiveHeight(1), height:responsiveHeight(48) }}>
          <Text style={{ fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(1), color:'black'}}>Select Dates:</Text>
          <Calendar
            markedDates={{ ...selectedDates, ...markDisabledDates() }}
            onDayPress={(day) => {
              const selectedDatesCopy = { ...selectedDates };
              if (selectedDatesCopy[day.dateString]) {
                delete selectedDatesCopy[day.dateString];
              } else {
                selectedDatesCopy[day.dateString] = { selected: true };
              }
              setSelectedDates(selectedDatesCopy);
            }}
            theme={{
              // Calendar theme settings...
            }}
            style={{ borderRadius: 10 }}
          />
        </View>
        <Button title='Add Match' onPress={handleAddMatch} />
      </View>
      
    </View>
  );
}
