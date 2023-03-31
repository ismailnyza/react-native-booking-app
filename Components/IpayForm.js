import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function IpayForm() {
  const source = { html: `
    <html>
    <body>
    <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
    <input type="hidden" name="merchantWebToken" value="eyJhbGciOiJIUz..."> <!-- Replace your web token -->
    <input type="hidden" name="orderId" value="OID123456">
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
  `};

  return (
    <View style={styles.container}>
      <WebView source={source} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
