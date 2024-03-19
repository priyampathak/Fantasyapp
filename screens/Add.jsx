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

      </View>
      
    </View>
  );
}
