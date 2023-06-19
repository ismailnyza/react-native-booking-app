import React from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import { styles } from "../Styles/Styles";

const PaymentSuccessPage = ({ navigation }) => {
  const paymentSuccessImage = require('../assets/greencheckbox.png');

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={paymentSuccessImage} style={styles.checkbox} />
      <Text style={styles.title}>Payment Successful</Text>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default PaymentSuccessPage;
