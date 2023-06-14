import React from "react";
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

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url != null) {
      console.log(url);
    }

    if (
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
            Alert.alert("Payment Successful");
            props.navigation.navigate("Home");
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
    } else if (url === "http://mywebsite.com/cancel?orderId=OID123456") {
      // Payment failed
      props.navigation.navigate("Home");
      Alert.alert("Transaction Failed");
    }
  };

  const htmlContent = `
  <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
  <input type="hidden" name="merchantWebToken" value="eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiIwMDAwMDQzNyJ9.QRjj-CMOM95XyEhhYPHcKE_wx1nAfpyLlCOCj6hqgSURevSLfWF2_kz7_lX4lrZE4tEPutKVNJCMqRI9mRG03Q"> <!-- Replace your web token -->
  <input type="hidden" name="orderId" value="OderID${sessionUUID}">
  <input type="hidden" name="orderDescription" value="My Order"> <!-- Optional -->
  <input type="hidden" name="returnUrl" value="http://mywebsite.com/return?orderId=OID123456">
  <input type="hidden" name="cancelUrl" value="http://mywebsite.com/cancel?orderId=OID123456">
  <input type="hidden" name="subMerchantReference" value=""> <!-- Optional -->
  <table>
  <tr>
  <td>Total Amount</td>
  <td>:</td>
  <td><input type="text" name="totalAmount" value="750"></td>
  </tr>
  <tr>
  <td>Customer Name </td>
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
        onNavigationStateChange={handleNavigationStateChange}
        originWhitelist={["*"]} // Allow loading the external payment gateway
      />
    </View>
  );
}
