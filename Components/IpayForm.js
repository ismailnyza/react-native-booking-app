import React, { useState } from 'react';
import { View, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function IpayForm(props) {
  const [currentUrl, setCurrentUrl] = useState('');
  const patient = props.route.params;
  console.log(patient);
  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
  if (url != null) {
    setCurrentUrl(url);
    console.log(url);
  }

  if (
    url.startsWith(
      "https://sandbox.ipay.lk/ipg/checkout/mpgs/return?resultIndicator"
    )
  ) {
    // Payment successful
    // webViewRef.current.stopLoading();
    fetch("http://192.168.122.1:9090/bookings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert("Payment Successful");
          // Navigate to MyBookingsScreen
          props.navigation.navigate("Home");
        } else {
          Alert.alert("Failed to create booking");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Failed to create booking");
    props.navigation.navigate("Home");


      });
  } else if (url === "http://mywebsite.com/cancel?orderId=OID123456") {
    // Payment failed
    // webViewRef.current.destroy();
    props.navigation.navigate("Home");
    Alert.alert("Transaction Failed");
  }
};



  const htmlContent = `
  <!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f2f2f2;
    }

    .container {
      width: 100%;
      max-width: 480px;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      font-weight: bold;
      display: block;
      margin-bottom: 8px;
    }

    .form-group input[type="text"] {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .form-group input[type="submit"] {
      width: 100%;
      padding: 14px 0;
      border: none;
      border-radius: 4px;
      background-color: #000000;
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
    }

    .form-group input[type="submit"]:hover {
      background-color: #333333;
    }

    .form-group input[type="submit"]:focus {
      outline: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
      <div class="form-group">
        <label for="customerName">Name</label>
        <input type="text" name="customerName" id="customerName" />
      </div>
      <div class="form-group">
        <label for="customerPhone">Phone</label>
        <input type="text" name="customerPhone" id="customerPhone" />
      </div>
      <div class="form-group">
        <label for="customerEmail">Email</label>
        <input type="text" name="customerEmail" id="customerEmail" />
      </div>
      <div class="form-group">
        <label for="totalAmount">Amount</label>
        <input type="text" name="totalAmount" id="totalAmount" />
      </div>
      <input type="hidden" name="merchantWebToken" value="eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiIwMDAwMDQzNyJ9.QRjj-CMOM95XyEhhYPHcKE_wx1nAfpyLlCOCj6hqgSURevSLfWF2_kz7_lX4lrZE4tEPutKVNJCMqRI9mRG03Q" />
      <input type="hidden" name="orderId" value="OID123456" />
      <input type="hidden" name="orderDescription" value="My Order" />
      <input type="hidden" name="returnUrl" value="http://mywebsite.com/return?orderId=OID123456" />
      <input type="hidden" name="cancelUrl" value="http://mywebsite.com/cancel?orderId=OID123456" />
      <input type="hidden" name="subMerchantReference" value="" />
      <input type="submit" value="Checkout Now" />
    </form>
  </div>
</body>
</html>

  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
}
