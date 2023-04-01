import React, { useState } from "react";
import { View, Text, Alert, Button } from "react-native";

function RefundDetails({ route, navigation }) {
  const { bookingData } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleProceedClick = () => {
    setIsLoading(true);
    console.log(bookingData.bookingId);
    fetch(`http://192.168.122.1:9090/bookings/${bookingData.bookingId}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        try {
          const responseData = JSON.parse(data);
          console.log("Response from server:", responseData);
          if (responseData.bookingId === bookingData.bookingId) {
            Alert.alert("Booking Refunded");
            navigation.goBack();
          } else {
            Alert.alert("Booking Refunded");
            navigation.goBack();
          }
        } catch (error) {
          console.error(error);
          Alert.alert("Booking Refunded");
            navigation.goBack();

          //   navigation.navigate("MyBookingsScreen");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Failed to refund booking");
        navigation.navigate("MyBookingsScreen");
        setIsLoading(false);
      });
  };

  return (
    <View>
      <Text>Booking Time: {bookingData.bookingTime.join(":")}</Text>
      <Text>Booking Date: {bookingData.bookingDate.join("/")}</Text>
      <Text>Doctor: {bookingData.bookingDoctor}</Text>
      <Text>Customer Name: {bookingData.bookingCustomer}</Text>
      <Text>Amount Paid: {bookingData.bookingPrice}</Text>
      <Text>Are you sure you want to refund?</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          title="Proceed"
          onPress={handleProceedClick}
          disabled={isLoading}
        />
        <Button
          title="Quit"
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}

export default RefundDetails;
