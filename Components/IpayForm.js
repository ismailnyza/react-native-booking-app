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
    <body>
      <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
        <input
          type="hidden"
          name="merchantWebToken"
          value="eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiIwMDAwMDQzNyJ9.QRjj-CMOM95XyEhhYPHcKE_wx1nAfpyLlCOCj6hqgSURevSLfWF2_kz7_lX4lrZE4tEPutKVNJCMqRI9mRG03Q"
        />
        <input type="hidden" name="orderId" value="OID123456" />
        <input type="hidden" name="orderDescription" value="My Order" />
        <!-- Optional -->
        <input
          type="hidden"
          name="returnUrl"
          value="http://mywebsite.com/return?orderId=OID123456"
        />
        <input
          type="hidden"
          name="cancelUrl"
          value="http://mywebsite.com/cancel?orderId=OID123456"
        />
        <input type="hidden" name="subMerchantReference" value="" />
        <table>
          <tr>
            <td><input type="hidden" name="totalAmount" value="2000" /></td>
          </tr>
          <tr>
              <input type="hidden" name="customerName" value="Test user" />
            </td>
          </tr>
          <tr>
            <td><input type="hidden" name="customerPhone" value="0701234567" /></td>
          </tr>
          <tr>
              <input type="hidden" name="customerEmail" value="myemail@mail.com" />
            </td>
          </tr>
        </table>
        <br />
        <input type="submit" value="Checkout Now" />
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
