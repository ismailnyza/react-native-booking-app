import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native"; // Import the Alert component

import { FlatList, ImageBackground, Text, View, Linking } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { styles } from "../Styles/Styles";

function BookingItem({ booking, navigation }) {
  const [showRefundBubble, setShowRefundBubble] = useState(false);

  const handleRefundClick = () => {
    navigation.navigate("RefundDetails", { bookingData: booking });
  };

  const cancelBooking = async (booking) => {
    console.log(booking)
    const endpoint = `http://192.168.122.1:9090/${booking.bookingId}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });
      
      if (response.ok) {
        // Booking canceled successfully
        console.log("Booking canceled successfully");
        // Perform any necessary actions after successful cancellation
      } else {
        // Handle the error case
        throw new Error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("An error occurred while canceling booking:", error);
      // Show an error message to the user
      Alert.alert("Error", "Failed to cancel booking. Please try again later.");
    }
  };
  


  const formatDate = (date) => {
    const options = { day: "numeric", month: "long" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(time).toLocaleTimeString([], options);
  };

  const handleCallButtonPress = () => {
    const phoneNumber = "0123456789"; // Replace with desired phone number
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  return (
    <Card style={styles.bookingCard}>
      <Card.Content>
        <View style={styles.bookingRow}>
          <View style={styles.bookingInfoContainer}>
            <IconButton icon="clock-outline" size={20} />
            <Text style={styles.bookingInfo}>
              {formatDate(booking.bookingDate)}, {formatTime(booking.bookingTimeFrom)} - {formatTime(booking.bookingTimeTo)}
            </Text>
          </View>
        </View>
        <View style={styles.bookingRow}>
          <View style={styles.bookingInfoContainer}>
            <Text style={styles.bookingLabel}>Doctor:</Text>
            <Text style={styles.bookingInfo}>{booking.bookingDoctor}</Text>
          </View>
          <View style={styles.bookingInfoContainer}>
            <Text style={styles.bookingLabel}>Hospital:G.H. Galle</Text>
            <Text style={styles.bookingInfo}>{booking.bookingHospital}</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <Button
            buttonColor="black"

            icon="phone"
            mode="contained"
            style={[styles.button, { backgroundColor: "black" }]}
            onPress={handleCallButtonPress}
          >
            Call
          </Button>
          <Button
            buttonColor="black"

            icon="trash-can-outline"
            mode="contained"
            style={[styles.button, { backgroundColor: "black" }]}
            onPress={cancelBooking}
          >
            Cancel Booking
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

export default function MyBookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    fetch("http://192.168.122.1:9090/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchBookings();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(booking) => booking.bookingId.toString()}
        renderItem={({ item }) => (
          <BookingItem booking={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}
