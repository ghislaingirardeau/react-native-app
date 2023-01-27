import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
} from "react-native";

export default function TheLastCities({ navigation, lastCities }) {
  const openFavoriteCity = (data) => {
    const { lat, lon, name } = data;
    console.log(data);
    navigation.navigate("Results", {
      // TO PASS PARAMS TO THE ROUTE
      lat,
      lon,
      city: name,
    });
  };

  return (
    <View>
      <Text style={styles.title}>My favorite cities</Text>

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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#073B4C",
    borderBottomColor: "#073B4C",
    borderBottomWidth: 2,
  },
  rowCity: {
    height: 45,
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 3,
    borderColor: "#EF476F",
  },
  cityText: {
    color: "#118AB2",
    fontSize: 16,
    fontWeight: "bold",
  },
});
