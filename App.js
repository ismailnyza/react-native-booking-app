import React from "react";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Button, Image, ImageBackground, Text, View} from "react-native";
import {styles} from "./Styles/Styles";
import MakeBookingScreen from "./Components/MakeBooking";
import ConfirmBooking from "./Components/IpayForm";
import IpayForm from "./Components/IpayForm";
import MyBookings from "./Components/MyBookings";
import RefundDetails from "./Components/RefundDetails";

// Import the font file
import {useFonts} from "expo-font";
import {Poppins_400Regular, Poppins_700Bold,} from "@expo-google-fonts/poppins";

const Stack = createStackNavigator();

function HomeScreen() {
    const navigation = useNavigation();

    // Load the font
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <ImageBackground
                source={require("./assets/Admin-payments.png")} // Replace with your image source
                style={styles.backgroundImage}
                resizeMode="stretch"
            >
                <Text style={[styles.title, {fontFamily: "Poppins_700Bold"}]}>
                    BookDoc
                </Text>
                <Image
                    source={require("./assets/image-doctor.png")} // Replace with your image source
                    style={styles.imageDoctor}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Make a booking"
                        color="black"
                        onPress={() => navigation.navigate("MakeBookingScreen")}
                        style={styles.button}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="My Bookings"
                        color="black"
                        onPress={() => navigation.navigate("MyBookingsScreen")}
                    />
                </View>
            </ImageBackground>
        </>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="MakeBookingScreen" component={MakeBookingScreen}/>
                <Stack.Screen name="MyBookingsScreen" component={MyBookings}/>
                <Stack.Screen name="ConfirmBooking" component={ConfirmBooking}/>
                <Stack.Screen name="IpayForm" component={IpayForm}/>
                <Stack.Screen name="RefundDetails" component={RefundDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
