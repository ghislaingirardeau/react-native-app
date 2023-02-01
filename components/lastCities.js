import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TheLastCities({
  navigation,
  lastCities,
  setLastCities,
}) {
  const openFavoriteCity = (data) => {
    const { lat, lon, name } = data;
    navigation.navigate("Results", {
      // TO PASS PARAMS TO THE ROUTE
      lat,
      lon,
      city: name,
    });
  };

  const removeLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem("@myapp");
      setLastCities([]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>My favorite cities</Text>
        <Pressable onPress={removeLocalStorage}>
          <Ionicons name="close-circle-outline" size={22} color="#118AB2" />
        </Pressable>
      </View>

      {lastCities.map((city, index) => (
        <TouchableHighlight
          key={index}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => openFavoriteCity(city)}
        >
          <View style={styles.rowCity}>
            <Text style={styles.cityText}>{city.name}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#073B4C",
    borderBottomWidth: 2,
    paddingRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#073B4C",
  },
  rowCity: {
    height: 45,
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 3,
    borderColor: "#06D6A0",
  },
  cityText: {
    color: "#118AB2",
    fontSize: 16,
    fontWeight: "bold",
  },
});
