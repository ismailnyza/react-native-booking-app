import React, { useState } from "react";
import { Alert, ImageBackground, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "../Styles/Styles";

export default function MakeBookingScreen({ navigation }) {
  const [doctor, setDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientDescription, setPatientDescription] = useState("");

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
    { key: 1, doctorName: "Dr. John Smith" },
    { key: 2, doctorName: "Dr. Jane Doe" },
    { key: 3, doctorName: "Dr. David Johnson" },
    { key: 4, doctorName: "Dr. Sarah Anderson" },
    { key: 5, doctorName: "Dr. Michael Williams" },
    { key: 6, doctorName: "Dr. Emily Brown" },
    { key: 7, doctorName: "Dr. Christopher Taylor" },
    { key: 8, doctorName: "Dr. Jessica Martinez" },
    { key: 9, doctorName: "Dr. Daniel Wilson" },
    { key: 10, doctorName: "Dr. Olivia Thompson" },
    { key: 11, doctorName: "Dr. Benjamin Davis" },
    { key: 12, doctorName: "Dr. Sophia Rodriguez" },
  ];

  const handleDoctorChange = (doctor) => {
    setDoctor(doctor);
  };

  const handlePatientNameChange = (event) => {
    setPatientName(event);
  };

  const handlePatientAgeChange = (event) => {
    setPatientAge(event);
  };

  const handlePatientGenderChange = (event) => {
    setPatientGender(event);
  };

  const handlePatientDescriptionChange = (event) => {
    setPatientDescription(event);
  };

  const handleAppointmentDateChange = (selectedDate) => {
    if (selectedDate) {
      setAppointmentTime(selectedDate);
      setShowDatePicker(false);
    }
  };

  const handleAppointmentTimeChange = (selectedTime) => {
    if (selectedTime) {
      setAppointmentTime(selectedTime);
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
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    if (!doctor) {
      Alert.alert("Please select a doctor.");
      return;
    }

    if (!appointmentTime) {
      Alert.alert("Please select an appointment time.");
      return;
    }

    if (appointmentTime.getTime() <= currentTime) {
      Alert.alert("Appointment time should be after the current time.");
      return;
    }

    if (!patientName) {
      Alert.alert("Please enter a Patient Name.");
      return;
    }

    if (!patientAge) {
      Alert.alert("Please enter Patient Age.");
      return;
    }

    if (!patientGender) {
      Alert.alert("Please select Patient Gender.");
      return;
    }

    if (!patientDescription) {
      Alert.alert("Please enter Patient Description.");
      return;
    }

    const request_data = {
      bookingDoctor: doctors[doctor - 1].doctorName,
      bookingDate: appointmentTime.toISOString().substring(0, 10),
      bookingTime: appointmentTime.toISOString().substring(11, 16),
    };

    console.log("Request data ", request_data);

    // Code to check doctor availability goes here
    Alert.alert("Doctor is available!");
  };

  const handleBookingConfirmation = () => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    if (!doctor) {
      Alert.alert("Please select a doctor.");
      return;
    }

    if (!appointmentTime) {
      Alert.alert("Please select an appointment time.");
      return;
    }

    if (appointmentTime.getTime() <= currentTime) {
      Alert.alert("Appointment time should be after the current time.");
      return;
    }

    if (!patientName) {
      Alert.alert("Please enter a Patient Name.");
      return;
    }

    if (!patientAge) {
      Alert.alert("Please enter Patient Age.");
      return;
    }

    if (!patientGender) {
      Alert.alert("Please select Patient Gender.");
      return;
    }

    if (!patientDescription) {
      Alert.alert("Please enter Patient Description.");
      return;
    }

    navigation.navigate("ConfirmBooking", {
      date: appointmentTime.toLocaleDateString(),
      time: appointmentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      doctorName: doctors[doctor - 1].doctorName, // Updated to retrieve doctor name
      patientName: patientName, // Added patient name
      patientAge: patientAge, // Added patient age
      patientGender: patientGender, // Added patient gender
      patientDescription: patientDescription, // Added patient description
      hospital: "City Hospital",
      totalCharge: 2000.0,
    });
  };

  return (
    <ImageBackground style={styles.backgroundImage} resizeMode="stretch">
      <Text style={[styles.title, { fontFamily: "Poppins_700Bold" }]}>
        Make a booking
      </Text>

      <View style={styles.form}>
        <Picker
          selectedValue={doctor}
          onValueChange={handleDoctorChange}
          mode="dropdown"
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

        <TextInput
          style={styles.input}
          label="Patient Name"
          value={patientName}
          onChangeText={handlePatientNameChange}
          mode="outlined"
        />

        <TextInput
          style={styles.input}
          label="Patient Age"
          value={patientAge}
          onChangeText={handlePatientAgeChange}
          mode="outlined"
        />

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTime}>
            <Button
              mode="outlined"
              buttonColor="black"
              textColor="white"
              onPress={showDatePickerModal}
            >
              Select date
            </Button>
          </View>
          <View style={styles.dateTime}>
            <Button
              mode="outlined"
              buttonColor="black"
              textColor="white"
              onPress={showTimePickerModal}
            >
              Select time
            </Button>
          </View>
        </View>

        <Picker
          selectedValue={patientGender}
          onValueChange={handlePatientGenderChange}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value={null} />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        <TextInput
          style={styles.textarea}
          label="Patient Description"
          value={patientDescription}
          onChangeText={handlePatientDescriptionChange}
          // mode="outlined"
          multiline
          numberOfLines={4}
        />

        <Button
          style={styles.availabilityButton}
          buttonColor="black"
          textColor="white"
          onPress={handleAvailabilityCheck}
        >
          Check availability
        </Button>

        <Button
          style={styles.bookingButton}
          buttonColor="black"
          textColor="white"
          onPress={handleBookingConfirmation}
        >
          Confirm booking
        </Button>

        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={handleAppointmentDateChange}
          onCancel={() => setShowDatePicker(false)}
        />

        <DateTimePickerModal
          isVisible={showTimePicker}
          mode="time"
          onConfirm={handleAppointmentTimeChange}
          onCancel={() => setShowTimePicker(false)}
        />
      </View>
    </ImageBackground>
  );
}
