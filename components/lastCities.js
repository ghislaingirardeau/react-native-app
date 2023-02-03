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
import globalStyle from "../assets/style/style";

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
    <View style={styles.favoriteContainer}>
      <View style={styles.favoriteHeader}>
        <Text style={globalStyle.sectionTitle}>Mes villes favorites</Text>
        <Pressable onPress={removeLocalStorage}>
          <Ionicons
            name="close-circle-outline"
            size={28}
            color={globalStyle.colorFourth}
          />
        </Pressable>
      </View>

      {lastCities.map((city, index) => (
        <FadeInView delay={index * 100} key={index}>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor={globalStyle.colorFifth}
            onPress={() => openFavoriteCity(city)}
          >
            <View style={globalStyle.homeRowCity}>
              <Text style={globalStyle.HomeRowCityText}>{city.name}</Text>
            </View>
          </TouchableHighlight>
        </FadeInView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteContainer: {
    flex: 9,
    marginTop: 10,
  },
  favoriteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: globalStyle.colorPrimary,
    borderBottomWidth: 2,
    paddingRight: 15,
  },
});
