import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { styles } from "../Styles/Styles";

function RefundFormScreen({ route, navigation }) {
  const { bookingData } = route.params;
  const [customerName, setCustomerName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleRequestRefundClick = () => {
    if (!customerName || !accountNumber || !bank || !branch || !contactNumber) {
      Alert.alert("Error", "Please fill in all the mandatory fields.");
      return;
    }

    fetch(`http://192.168.122.1:9090/bookings/${bookingData.bookingId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert("Success", "Refund request submitted successfully.");
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", "Failed to submit refund request.");
        }
      })
      .catch((error) => {
        Alert.alert("Error", "An error occurred while submitting refund request.");
      });
  };

  console.log(bookingData);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Refund Form</Text>
      <Text style={styles.label}>Booking Details:</Text>
      <Text style={styles.label}>Doctor: {bookingData.bookingDoctor}</Text>
      <Text style={styles.label}>Hospital: {bookingData.bookingHospital}</Text>
      <Text style={styles.label}>Date: {bookingData.bookingDate}</Text>
      <Text style={styles.label}>
        Time: {bookingData.bookingTimeFrom} - {bookingData.bookingTimeTo}
      </Text>
      <Text style={styles.label}>Please provide your information for the refund:</Text>
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Bank"
        value={bank}
        onChangeText={setBank}
      />
      <TextInput
        style={styles.input}
        placeholder="Branch"
        value={branch}
        onChangeText={setBranch}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <Button
        mode="contained"
        onPress={handleRequestRefundClick}
        style={styles.button}
        title="Request Refund"
      />
    </View>
  );
}

export default RefundFormScreen;
