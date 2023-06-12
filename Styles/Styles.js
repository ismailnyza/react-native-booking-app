import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        // height: "100%",
        // width: "100%",
        fontFamily: "Poppins_700Bold",
        color: "black",
        padding: 1
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

    // new ones

    input: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "white",
        paddingHorizontal: 10,
        height: 40,
      },
      textarea: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: "top",
        height: 120,
      },
      button: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "black",
        paddingVertical: 10,
      },
      picker: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "white",
      },

      availabilityButton: {
        marginTop: 10, // Add margin top spacing
      },
    
      bookingButton: {
        marginTop: 10, // Add margin top spacing
      },

    //   
     // New styles for MyBookingsScreen
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  bookingCard: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 10,
  },
  bookingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bookingInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap", // Wrap the content to the next line if it exceeds the width
  },
  bookingLabel: {
    marginRight: 5,
    marginLeft:10,
    fontWeight: "bold",
  },
  bookingInfo: {
    marginLeft: 5,
    flexShrink: 1, // Allow the text to shrink if it exceeds the available space
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    height: 40,
    width: "48%",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 30
  },
  contentContainer: {
    flexGrow: 1,
  },
});
