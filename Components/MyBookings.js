import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {FlatList, Text, View} from "react-native";
import {styles} from "../Styles/Styles";

function BookingItem({booking, navigation}) {
    const [showRefundBubble, setShowRefundBubble] = useState(false);

    const handleRefundClick = () => {
        navigation.navigate("RefundDetails", {bookingData: booking});
    };

    return (
        <View style={styles.bookingRow}>
            <View style={styles.bookingCell}>
                <StatusBar style="auto"/>
                <Text>{booking.bookingTime.join(":")}</Text>
            </View>
            <View style={styles.bookingCell}>
                <Text>{booking.bookingDate.join("/")}</Text>
            </View>
            <View style={styles.bookingCell}>
                <Text>{booking.bookingDoctor}</Text>
            </View>
            <View style={styles.refundButtonCell}>
                <Text style={styles.refundButton} onPress={handleRefundClick}>
                    Refund
                </Text>
            </View>
        </View>
    );
}

export default function MyBookingsScreen({navigation}) {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = () => {
        fetch("http://192.168.122.1:9090/bookings")
            .then((response) => response.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchBookings();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.bookingHeader}>
                <View style={styles.bookingCell}>
                    <StatusBar style="auto"/>
                    <Text>Booking Time</Text>
                </View>
                <View style={styles.bookingCell}>
                    <Text>Booking Date</Text>
                </View>
                <View style={styles.bookingCell}>
                    <Text>Doctor</Text>
                </View>
                <View style={styles.refundButtonCell}>
                    <Text>Refund</Text>
                </View>
            </View>
            <FlatList
                data={bookings}
                keyExtractor={(booking) => booking.bookingId.toString()}
                renderItem={({item}) => (
                    <BookingItem booking={item} navigation={navigation}/>
                )}
            />
        </View>
    );
}
