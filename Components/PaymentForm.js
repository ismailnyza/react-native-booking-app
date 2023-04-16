import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

const PaymentForm = ({navigation}) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    const handleCheckout = () => {
        // Code to handle checkout goes here
        alert('Checkout initiated!');
    };

    return (
        <View>
            <Text>Total Amount:</Text>
            <TextInput
                placeholder="Enter total amount"
                onChangeText={(text) => setTotalAmount(text)}
                keyboardType="numeric"
            />
            <Text>Customer Name:</Text>
            <TextInput
                placeholder="Enter customer name"
                onChangeText={(text) => setCustomerName(text)}
            />
            <Text>Customer Phone:</Text>
            <TextInput
                placeholder="Enter customer phone"
                onChangeText={(text) => setCustomerPhone(text)}
                keyboardType="numeric"
            />
            <Text>Customer Email:</Text>
            <TextInput
                placeholder="Enter customer email"
                onChangeText={(text) => setCustomerEmail(text)}
                keyboardType="email-address"
            />
            <Button title="Checkout Now" onPress={handleCheckout}/>
        </View>
    );
};

export default PaymentForm;
