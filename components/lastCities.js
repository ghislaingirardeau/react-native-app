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
import FadeInView from "./fadeRow";
import { useFonts, Handlee_400Regular } from "@expo-google-fonts/handlee"; // importer la font que l'on souhaite sur google

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

  let [fontsLoaded] = useFonts({
    Handlee_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

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
      <View style={styles.favoriteHeader}>
        <Text style={styles.title}>Mes villes favorites</Text>
        <Pressable onPress={removeLocalStorage}>
          <Ionicons name="close-circle-outline" size={22} color="#118AB2" />
        </Pressable>
      </View>

      {lastCities.map((city, index) => (
        <FadeInView delay={index * 100} key={index}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => openFavoriteCity(city)}
          >
            <View style={styles.rowCity}>
              <Text style={styles.cityText}>{city.name}</Text>
            </View>
          </TouchableHighlight>
        </FadeInView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteHeader: {
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
    fontFamily: "Handlee_400Regular",
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
    fontFamily: "Handlee_400Regular",
  },
});
