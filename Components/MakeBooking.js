import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Platform,
  ImageBackground,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import { styles } from "../Styles/Styles";

export default function MakeBookingScreen({ navigation }) {
  const [doctor, setDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const doctors = [
    { key: 1, doctorName: "Dr. John Smith" },
    { key: 2, doctorName: "Dr. Jane Doe" },
  ];

  const handleDoctorChange = (value) => {
    setDoctor(value);
  };

  const handleCustomerNameChange = (event) => {
    console.log(event);
    if (event != null) {
      setCustomerName(event);
    }
  };

  const handleAppointmentDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setAppointmentTime(selectedDate);
      setShowDatePicker(false);
    }
  };

  const handleAppointmentTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const selectedDateTime = new Date(appointmentTime);
      selectedDateTime.setHours(selectedTime.getHours());
      selectedDateTime.setMinutes(selectedTime.getMinutes());
      setAppointmentTime(selectedDateTime);
      setShowTimePicker(false);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleAvailabilityCheck = () => {
    // Code to check doctor availability goes here
    Alert.alert("Doctor is available!");
  };
  const handleBookingConfirmation = () => {
    // Get current time and date
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    if (!/^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/.test(customerName)) {
      Alert.alert("Error", "Please enter a valid customer name.");
      return;
    }

    if (!doctor) {
      alert("Please select a doctor.");
      return;
    }

    if (!appointmentTime) {
      alert("Please select an appointment time.");
      return;
    }

    // Check if appointment time is before current time
    if (appointmentTime.getTime() <= currentTime) {
      alert("Appointment time should be after current time.");
      return;
    }

    navigation.navigate("ConfirmBooking", {
      customerName: customerName,
      date: appointmentTime.toLocaleDateString(),
      time: appointmentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      doctorName: doctor,
      hospital: "City Hospital",
      totalCharge: 2000.0,
    });
  };

  return (
    <ImageBackground
      source={require("../assets/Admin-payments.png")} // Replace with your image source
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <Text style={[styles.title, { fontFamily: "Poppins_700Bold" }]}>
        Make a booking
      </Text>
      <View style={styles.form}>
        <Text style={styles.label}>Customer Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleCustomerNameChange}
        />
        <Text style={styles.label}></Text>
        <Text style={styles.label}>Doctor</Text>
        {/* here */}
        <Picker selectedValue={doctor} onValueChange={handleDoctorChange}>
          <Picker.Item label="Select a doctor" value={null} />
          {doctors.map((doctor) => (
            <Picker.Item
              key={doctor.key}
              label={doctor.doctorName}
              value={doctor.key}
            />
          ))}
        </Picker>
        <Text style={styles.dateTimeText}>
          {appointmentTime.toLocaleDateString()}
        </Text>
        <Text style={styles.dateTimeText}>
          {appointmentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTime}>
            <Text style={styles.label}>Appointment date</Text>
            <Button title="Select date" onPress={showDatePickerModal} />
          </View>
          <View style={styles.dateTime}>
            <Text style={styles.label}>Appointment time</Text>
            <Button title="Select time" onPress={showTimePickerModal} />
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={appointmentTime}
            mode="date"
            display="default"
            onChange={handleAppointmentDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={appointmentTime}
            mode="time"
            display="default"
            onChange={handleAppointmentTimeChange}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button
            title="Add Customer Details"
            onPress={handleBookingConfirmation}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Confirm booking" onPress={handleBookingConfirmation} />
        </View>
      </View>
    </ImageBackground>
  );
}
