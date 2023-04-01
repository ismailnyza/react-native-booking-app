import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import { styles } from "../Styles/Styles";

export default function MakeBookingScreen({ navigation }) {
  const [doctor, setDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDoctorChange = (value) => {
    setDoctor(value);
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
    // Code to confirm booking goes here
    // Navigate to the confirm payment screen

    navigation.navigate("ConfirmBooking", {
      customerName: "John Doe",
      date: appointmentTime.toLocaleDateString(),
      time: appointmentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      doctorName: doctor,
      hospital: "City Hospital",
      totalCharge: 2000,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Make a booking</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Doctor</Text>
        <Picker selectedValue={doctor} onValueChange={handleDoctorChange}>
          <Picker.Item label="Dr. John Doe" value="Dr. John Doe" />
          <Picker.Item label="Dr. Jane Smith" value="Dr. Jane Smith" />
          <Picker.Item label="Dr. Robert Johnson" value="Dr. Robert Johnson" />
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
          <Button title="Confirm booking" onPress={handleBookingConfirmation} />
        </View>
      </View>
    </View>
  );
}
