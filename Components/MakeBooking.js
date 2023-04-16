import React, { useState } from "react";
import {
  Alert,
  Button,
  ImageBackground,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Picker } from "@react-native-picker/picker";

import { styles } from "../Styles/Styles";

export default function MakeBookingScreen({ navigation }) {
  const [doctor, setDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [patientName, setpatientName] = useState(false);
  const [patientDescription, setpatientDescription] = useState(false);

  const TextInputWithLabel = ({ label, value, onChangeText }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label}`}
        />
      </View>
    );
  };

  const doctors = [
    // should be repaced with an api call
    { key: 1, doctorName: "Dr. John Smith" },
    { key: 2, doctorName: "Dr. Jane Doe" },
  ];
  const convertDateTimeToApiRequirement = (date, time) => {
    //  appointmentTime.
  };

  const handleDoctorChange = (event) => {
    setDoctor(event);
    console.log(doctor);
  };

  const handlePatientNameChange = (event) => {
    console.log(event);
    if (event != null) {
      setpatientName(event);
    }
  };

  const handlePatientDescriptionChange = (event) => {
    console.log(event);
    if (event != null) {
      setpatientDescription(event);
    }
  };

  const handleAppointmentDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setAppointmentTime(selectedDate);
      console.log(selectedDate);
      setShowDatePicker(false);
    }
  };

  const handleAppointmentTimeChange = (event, selectedTime) => {

    if (selectedTime) {
      const selectedDateTime = new Date(appointmentTime);
      selectedDateTime.setHours(selectedTime.getHours());
      selectedDateTime.setMinutes(selectedTime.getMinutes());
      console.log(event.nativeEvent)
      setAppointmentTime(selectedDateTime);
      console.log("selected :" , selectedDateTime)
      console.log(appointmentTime)
      setShowTimePicker(false);
    }
    
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleAvailabilityCheck = async () => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    // Code to check doctor availability goes here

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

    if (!appointmentTime) {
      alert("Please select an appointment time.");
      return;
    }

    if (!patientName) {
      alert("Please enter a Patient Name.");
      return;
    }

    if (!patientDescription) {
      alert("Please Add a Patient Description.");
      return;
    }
    // Prepare request data
    const request_data = {
      
      bookingDoctor: doctors[doctor-1].doctorName,
      bookingDate: appointmentTime.toISOString().substring(0, 10),
      bookingTime: appointmentTime.toISOString().substring(11, 19),
    };
    // const time = appointmentTime.substr(12, 8);
    console.log("Request data ", request_data);

    try {
      const response = await fetch(
        "http://192.168.122.1:9090/bookings/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request_data),
        }
      );

      if (response.ok) {
        console.log(response)
        console.log(appointmentTime)
        // If response is successful, show success message
        Alert.alert("Doctor is available!");
      } else {
        // If response is not successful, show error message
        Alert.alert("Failed to check doctor availability.");
      }
    } catch (error) {
      // console.error("Error:", error);
      Alert.alert("Failed to check doctor availability.");
    }
  console.log("hi")
  };

  const handleBookingConfirmation = () => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

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

    if (!appointmentTime) {
      alert("Please select an appointment time.");
      return;
    }

    if (!patientName) {
      alert("Please enter a Patient Name.");
      return;
    }

    if (!patientDescription) {
      alert("Please Add a Patient Description.");
      return;
    }

    navigation.navigate("ConfirmBooking", {
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
      source={require("../assets/Admin-payments.png")}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <Text style={[styles.title, { fontFamily: "Poppins_700Bold" }]}>
        Make a booking
      </Text>
      {/*  */}
      <View style={styles.form}>
        <Picker
          selectedValue={doctor}
          onValueChange={(doctor) => handleDoctorChange(doctor)}
        >
          <Picker.Item label="Select a doctor" value={null} />
          {doctors.map((doctor) => (
            <Picker.Item
              key={doctor.doctorName}
              label={doctor.doctorName}
              value={doctor.key}
            />
          ))}
        </Picker>

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTime}>
            <Button title="Select date" onPress={showDatePickerModal} />
          </View>
          <View style={styles.dateTime}>
            <Button title="Select time" onPress={showTimePickerModal} />
          </View>
        </View>

        <View>
          <Text>Patient Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handlePatientNameChange}
            value={patientName}
          />
          <Text>Patient Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={handlePatientDescriptionChange}
            value={patientDescription}
          />
        </View>

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTime}>
            <Button
              title="Check availability "
              onPress={handleAvailabilityCheck}
            />
          </View>
          <View style={styles.dateTime}>
            <Button
              title="Confirm booking"
              onPress={handleBookingConfirmation}
            />
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
      </View>
    </ImageBackground>
  );
}
