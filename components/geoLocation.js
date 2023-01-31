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

import * as Location from "expo-location";

export default function geoLocation({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      alert(errorMsg);
      return;
    }

    let position = await Location.getCurrentPositionAsync({});
    setLocation(position);
  };

  useEffect(() => {
    getPosition();
  }, []);

  const currentLocation = () => {
    console.log(location.coords.latitude, location.coords.longitude);
    navigation.navigate("Results", {
      // TO PASS PARAMS TO THE ROUTE
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      city: "My current position",
    });
  };

  return (
    <View>
      <Text style={styles.title}>From my position</Text>
      <Pressable style={styles.button} onPress={currentLocation}>
        {location ? (
          <View style={styles.buttonContent}>
            <Text style={styles.textPosition}>Current position</Text>
            <Ionicons name="location-outline" size={20} color="#118AB2" />
          </View>
        ) : (
          <View style={styles.buttonContent}>
            <ActivityIndicator size="small" color="#FFD166" />
            <Text style={[styles.textPosition, { marginHorizontal: 10 }]}>
              Waiting...
            </Text>
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
  },
  button: {
    borderWidth: 2,
    borderColor: "#EF476F",
    elevation: 3,
    borderRadius: 7,
    padding: 10,
    marginVertical: 10,
  },
  textPosition: {
    color: "#118AB2",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
});
