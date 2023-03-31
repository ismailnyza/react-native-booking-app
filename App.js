import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./Styles/Styles";
import MakeBookingScreen from "./Components/MakeBooking";
import ConfirmBooking from "./Components/IpayForm";
import IpayForm from "./Components/IpayForm";
import MyBookings from "./Components/MyBookings";


const Stack = createStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Welcome to my App!</Text>
      <Button
        title="Make a booking"
        onPress={() => navigation.navigate("MakeBookingScreen")}
      />
      <Button
        title="My Bookings"
        onPress={() => navigation.navigate("MyBookingsScreen")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MakeBookingScreen" component={MakeBookingScreen} />
        <Stack.Screen name="MyBookingsScreen" component={MyBookings} />
        <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
        <Stack.Screen name="IpayForm" component={IpayForm} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
