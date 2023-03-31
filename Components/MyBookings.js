import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles/Styles';

export default function MyBookingsScreen() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://192.168.122.1:9090/bookings')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>My bookings:</Text>
      {bookings.map(booking => (
        <Text key={booking.id}>{booking.title}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}