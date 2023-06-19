import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { v4 as uuidv4 } from "uuid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function IpayForm(props) {
  const sessionUUID = uuidv4();
  const patient = props.route.params;

  // const patient = props.route.params.patient;


  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url !== undefined && url != null) {
      console.log(url);
    }

    if (
      url !== undefined &&
      url.startsWith(
        "https://sandbox.ipay.lk/ipg/checkout/mpgs/return?resultIndicator"
      )
    ) {
      // Payment successful
      fetch("http://192.168.122.1:9090/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      })
        .then((response) => {
          if (response.ok) {
            props.navigation.navigate("PaymentSuccess");
          } else {
            Alert.alert("Failed to create booking");
            props.navigation.navigate("Home");
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Failed to create booking");
          props.navigation.navigate("Home");
        });
    } else if (
      url !== undefined &&
      url === "http://mywebsite.com/cancel?orderId=OID123456"
    ) {
      // Payment failed
      props.navigation.navigate("Home");
      Alert.alert("Transaction Failed");
    }
  };

  console.log(patient)
  const htmlContent = `
  <html>
  <head>
    <title>My Form</title>
    <style>
      form {
        width: 100%;
      }
      
      input[type="submit"] {
        background-color: black;
        color: white;
        border-radius: 5px;
        padding: 10px;
      }
      
      * {
        font-size: 1.5rem;
      }
      
      form {
        padding: 20px;
        margin: 0 auto;
      }
      
      h1 {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
      <h1>Proceed to Payment Gateway</h1>
        <input type="hidden" name="merchantWebToken" value="eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiIwMDAwMDQzNyJ9.QRjj-CMOM95XyEhhYPHcKE_wx1nAfpyLlCOCj6hqgSURevSLfWF2_kz7_lX4lrZE4tEPutKVNJCMqRI9mRG03Q"> <!-- Replace your web token -->
        <input type="hidden" name="orderId" value="OderID${sessionUUID}">
        <input type="hidden" name="orderDescription" value="My Order"> <!-- Optional -->
        <input type="hidden" name="returnUrl" value="http://mywebsite.com/return?orderId=OID123456">
        <input type="hidden" name="cancelUrl" value="http://mywebsite.com/cancel?orderId=OID123456">
        <input type="hidden" name="subMerchantReference" value=""> <!-- Optional -->
        <table style="width: 100%;">
          <tr>
            <td>Total Amount</td>
            <td>:</td>
            <td><input type="text" name="totalAmount" value="2000"></td>
          </tr>
          <tr>
            <td>Customer Name </td>
            <td>:</td>
            <td><input type="text" name="customerName" value=${patient.patientName}></td>
          </tr>
        </table>
        <br>
        <input type="submit" value="Checkout Now">
      </form>
  </body>
  </html>
  
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        originWhitelist={["*"]} // Allow loading the external payment gateway
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
}
