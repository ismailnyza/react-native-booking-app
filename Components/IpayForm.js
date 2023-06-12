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

  const htmlContent = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f2f2f2;
          font-family: Arial, sans-serif;
        }
        
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          width: 80%;
          max-width: 400px;
        }
        
        table {
          width: 100%;
          margin-bottom: 20px;
        }
        
        input[type="text"] {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #dddddd;
          margin-bottom: 10px;
          box-sizing: border-box;
        }
        
        input[type="submit"] {
          background-color: #000000;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 20px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
        <input type="hidden" name="merchantWebToken" value="eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiIwMDAwMDQzNyJ9.QRjj-CMOM95XyEhhYPHcKE_wx1nAfpyLlCOCj6hqgSURevSLfWF2_kz7_lX4lrZE4tEPutKVNJCMqRI9mRG03Q"> 
        <input type="hidden" name="orderId" value={"OID" + uuid.v4()}">
        <input type="hidden" name="returnUrl" value="http://mywebsite.com/return?orderId=OID123456">
        <input type="hidden" name="cancelUrl" value="http://mywebsite.com/cancel?orderId=OID123456">
        <table>
          <tr>
            <td>Total Amount</td>
            <td>:</td>
            <td><input type="text" name="totalAmount" value="750"></td>
          </tr>
          <tr>
            <td>Customer Name</td>
            <td>:</td>
            <td><input type="text" name="customerName" value="Ravindu Fernando"></td>
          </tr>
          <tr>
            <td>Customer Mobile</td>
            <td>:</td>
            <td><input type="text" name="customerPhone" value="0701234567"></td>
          </tr>
          <tr>
            <td>Customer Email</td>
            <td>:</td>
            <td><input type="text" name="customerEmail" value="myemail@mail.com"></td>
          </tr>
        </table>
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
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
}
