import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts, Handlee_400Regular } from "@expo-google-fonts/handlee"; // importer la font que l'on souhaite sur google

import * as Location from "expo-location";

export default function geoLocation({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      getPosition();
    })();
  }, []);

  const getPosition = async () => {
    let position = await Location.getCurrentPositionAsync({});
    setLocation(position);
  };

  const currentLocation = () => {
    console.log(location.coords.latitude, location.coords.longitude);
    navigation.navigate("Results", {
      // TO PASS PARAMS TO THE ROUTE
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      city: "My current position",
    });
  };

  let [fontsLoaded] = useFonts({
    Handlee_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>Depuis ma position</Text>
      <Pressable style={styles.button} onPress={currentLocation}>
        {location ? (
          <View style={styles.buttonContent}>
            <Text style={styles.textPosition}>Trouver moi</Text>
            <Ionicons name="location-outline" size={22} color="#118AB2" />
          </View>
        ) : (
          <View style={styles.buttonContent}>
            <Text style={[styles.textPosition, { marginHorizontal: 10 }]}>
              Waiting...
            </Text>
            <ActivityIndicator size="small" color="#FFD166" />
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#073B4C",
    borderBottomColor: "#073B4C",
    borderBottomWidth: 2,
    fontFamily: "Handlee_400Regular",
  },
  button: {
    borderWidth: 2,
    borderColor: "#FFD166",
    elevation: 3,
    borderRadius: 7,
    padding: 10,
    marginVertical: 10,
  },
  textPosition: {
    color: "#118AB2",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Handlee_400Regular",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
});
