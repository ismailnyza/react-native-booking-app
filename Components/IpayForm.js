import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import uuid from "react-native-uuid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function IpayForm(props) {
  const sessionUUID = uuid.v4();
  const [currentUrl, setCurrentUrl] = useState("");
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

  const htmlContent =
    `
    <!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .container {
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
      padding: 5px;
    }

    form {
      background-color: #f2f2f2;
      padding: 10px;
      border-radius: 5px;
    }

    label {
      display: block;
      margin-bottom: 8px;
    }

    input[type="text"],
    input[type="submit"] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    input[type="submit"] {
      background-color: #4caf50;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
    }

    .title {
      text-align: center;
      margin-top: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h3 class="title">Customer Details</h3>
    <span>note: This is the details of the payee, not the patient</span>
    <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
      <input type="hidden" name="orderId" id="orderId" value="OID${sessionUUID}" />
      <input type="hidden" name="orderDescription" id="orderDescription" value="My Order${sessionUUID}" />
      <input type="hidden" name="merchantWebToken" value="eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiIwMDAwMDQzNyJ9.QRjj-CMOM95XyEhhYPHcKE_wx1nAfpyLlCOCj6hqgSURevSLfWF2_kz7_lX4lrZE4tEPutKVNJCMqRI9mRG03Q" />
      <input type="hidden" name="returnUrl" value="http://mywebsite.com/return?orderId=OID123456" />
      <input type="hidden" name="cancelUrl" value="http://mywebsite.com/cancel?orderId=OID123456" />
      <input type="hidden" name="subMerchantReference" value="" />
      <label for="totalAmount">Total Amount</label>
      <input type="text" name="totalAmount" id="totalAmount" value="2000" disabled />
      <label for="customerName">Customer Name</label>
      <input type="text" name="customerName" id="customerName" required />
      <label for="customerPhone">Customer Phone</label>
      <input type="text" name="customerPhone" id="customerPhone" required />
      <label for="customerEmail">Customer Email</label>
      <input type="text" name="customerEmail" id="customerEmail" required />
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
