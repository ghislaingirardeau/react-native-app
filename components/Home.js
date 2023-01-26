import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({ navigation }) {
  const [city, onChangeCity] = React.useState("nante");
  const doOnclick = () => {
    navigation.navigate("Results", {
      // TO PASS PARAMS TO THE ROUTE
      city,
    });
  };
  const citiesOption = async (e) => {
    console.log(e);
    /* const geoloc = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e3b9191867c7ac728751e62e58afde2d`
    );
    const result = await geoloc.json();
    console.log(result.map((e) => e.state)); */
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCity}
        value={city}
      />
      <Button title="Submit" onPress={doOnclick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
