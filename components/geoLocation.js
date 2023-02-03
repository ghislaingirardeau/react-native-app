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
import globalStyle from "../assets/style/style";

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
    <View style={styles.geoContainer}>
      <View style={styles.title}>
        <Text style={globalStyle.sectionTitle}>Depuis ma position</Text>
      </View>

      <Pressable style={styles.button} onPress={currentLocation}>
        {location ? (
          <View style={styles.buttonContent}>
            <Text style={styles.textPosition}>Trouver moi</Text>
            <Ionicons
              name="location-outline"
              size={28}
              color={globalStyle.colorFourth}
              style={[{ padding: 5, position: "absolute", right: 0, top: -10 }]}
            />
          </View>
        ) : (
          <View style={styles.buttonContent}>
            <Text style={[styles.textPosition, { marginHorizontal: 10 }]}>
              Waiting...
            </Text>
            <ActivityIndicator size="small" color={globalStyle.colorSecond} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  geoContainer: {
    flex: 3,
  },
  title: {
    borderBottomColor: globalStyle.colorPrimary,
    borderBottomWidth: 2,
  },
  button: {
    borderWidth: 2,
    borderColor: globalStyle.colorFourth,
    borderRadius: 7,
    padding: 10,
    marginVertical: 10,
  },
  textPosition: {
    color: globalStyle.colorThird,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Handlee_400Regular",
  },
  buttonContent: {},
});
