import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import { FlatList, Text, View, Linking } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { styles } from "../Styles/Styles";
import RefundFormScreen from "./RefundFormScreen";

function BookingItem({ booking, navigation }) {
  const [showRefundBubble, setShowRefundBubble] = useState(false);

  const handleRefundClick = () => {
    navigation.navigate("RefundFrom", {
      bookingData: booking,
    });
  };

  const cancelBooking = async (bookingId) => {
    console.log(bookingId);
    const endpoint = `http://192.168.122.1:9090/${bookingId}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Booking canceled successfully");
        handleRefundClick();
      } else {
        throw new Error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("An error occurred while canceling booking:", error);
      Alert.alert("Error", "Failed to cancel booking. Please try again later.");
    }
  };

  const formatDate = (date) => {
    if (!Array.isArray(date) || date.length !== 3) {
      return "Invalid date";
    }

    const [year, month, day] = date;
    const formattedDate = `${day}/${month + 1}/${year}`;
    return formattedDate;
  };

  const formatTime = (time) => {
    if (!Array.isArray(time) || time.length !== 2) {
      return "Invalid time";
    }

    const [hour, minute] = time;
    const formattedTime = `${hour}:${minute}`;
    return formattedTime;
  };

  return (
    <Card style={styles.bookingCard}>
      <Card.Content>
        <View style={styles.bookingRow}>
          <View style={styles.bookingInfoContainer}>
            <IconButton icon="clock-outline" size={20} />
            <Text style={styles.bookingInfo}>
              {formatDate(booking.bookingDate)}, {formatTime(booking.bookingTime)}
            </Text>
          </View>
        </View>
        <View style={styles.bookingRow}>
          <View style={styles.bookingInfoContainer}>
            <Text style={styles.bookingLabel}>Doctor:</Text>
            <Text style={styles.bookingInfo}>{booking.bookingDoctor}</Text>
          </View>
          <View style={styles.bookingInfoContainer}>
            <Text style={styles.bookingLabel}>Hospital:</Text>
            <Text style={styles.bookingInfo}>{booking.bookingHospital}</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <Button
            icon="trash-can-outline"
            mode="contained"
            color="black"
            style={styles.button}
            onPress={() => handleRefundClick(booking.bookingId)}
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

  const handleRequestRefund = (customerName, accountDetails) => {
    // Perform refund request logic
    // You can access customerName, accountDetails, and other necessary data here
    // Add your code here
  };

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
      <StatusBar style="auto" />
    </View>
  );
}
