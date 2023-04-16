import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        fontFamily: "Poppins_700Bold",
        color: "black",
    },
    backgroundGradient: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        color: "black",
    },
    form: {
        width: "80%",
        color: "black",
        fontFamily: "Poppins_400Regular",
        borderColor: 'black'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        bordeRadius: 5,
        backgroundColor: 'white',
        paddingLeft: 10

    },
    label: {
        fontSize: 16,
        color: "black",
        fontFamily: "Poppins_400Regular",
        margin: 2,
    },
    dateTimeText: {
        fontSize: 16,
        marginBottom: 10,
        color: "black",
        fontFamily: "Poppins_400Regular",
    },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        color: "black",
        fontFamily: "Poppins_700Bold",
    },
    dateTime: {
        flex: 1,
        marginRight: 10,
        color: "black",
        fontFamily: "Poppins_700Bold",
    },
    buttonContainer: {
        marginTop: 10,
        width: 200,
        height: 50,
    },
    imageDoctor: {
        width: 250,
        height: 250,
        resizeMode: "contain",
    },
    picker: {
        color: "black",
        fontFamily: "Poppins_400Regular",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
});
