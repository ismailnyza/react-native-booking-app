import React, { useState } from 'react';
import { View, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function IpayForm() {http://localhost:8080/bookings/create
  const [currentUrl, setCurrentUrl] = useState('');

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    setCurrentUrl(url);
    console.log(url)

    if (url.startsWith("https://sandbox.ipay.lk/ipg/checkout/mpgs/return?resultIndicator")){
      // Payment successful
      webViewRef.current.stopLoading();
      Alert.alert("Payment Successful");
    } else if (url === "http://mywebsite.com/cancel?orderId=OID123456") {
      // Payment failed
      webViewRef.current.stopLoading();
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
