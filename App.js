import React from "react";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { Image, ImageBackground, Text, View} from "react-native";
import {styles} from "./Styles/Styles";
import MakeBookingScreen from "./Components/MakeBooking";
import ConfirmBooking from "./Components/IpayForm";
import IpayForm from "./Components/IpayForm";
import MyBookings from "./Components/MyBookings";
import RefundDetails from "./Components/RefundDetails";
import RefundFormScreen from "./Components/RefundFormScreen";
import PaymentSuccessPage from "./Components/PaymentSuccessPage";

// Import the font file
import {useFonts} from "expo-font";
import {Poppins_400Regular, Poppins_700Bold,} from "@expo-google-fonts/poppins";
import { Button } from "react-native-paper";

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
                style={styles.backgroundImage}
                resizeMode="stretch"
            >
                <Image
                    source={require("./assets/image-doctor.jpg")} // Replace with your image source
                    style={styles.imageDoctor}
                />

                <Text style={[styles.title, {fontFamily: "Poppins_700Bold"}]}>
                    BookDoc
                </Text>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonColor="black"
                        textColor="white"
                        onPress={() => navigation.navigate("MakeBookingScreen")}
                    >
                    Make a booking
                    </Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        
                        buttonColor="black"
                        textColor="white"
                        onPress={() => navigation.navigate("MyBookingsScreen")}
                    >
                        My Bookings
                        </Button>
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
                <Stack.Screen name="RefundFrom" component={RefundFormScreen}/>
                <Stack.Screen name="PaymentSuccess" component={PaymentSuccessPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
