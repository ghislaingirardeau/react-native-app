import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

export default function Home({ navigation }) {
  const [city, onChangeCity] = React.useState("");
  const [data, setData] = React.useState([]);
  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [valueDropDown, setValueDropDown] = React.useState(null);
  const [items, setItems] = React.useState([]);

  const doOnclick = (state) => {
    const { lat, lon } = data.find((e) => e.state === state.value);
    navigation.navigate("Results", {
      // TO PASS PARAMS TO THE ROUTE
      lat,
      lon,
      city,
    });
  };
  const citiesOption = async (e) => {
    const geoloc = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e3b9191867c7ac728751e62e58afde2d`
    );
    const result = await geoloc.json();
    setData(
      result.filter(
        (v, i, a) => a.findIndex((v2) => v2.state === v.state) === i
      )
    );
    const states = data.map((item) => {
      const container = {};

      container.value = item.state;
      container.label = item.state;

      return container;
    });
    setItems(states);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCity}
        value={city}
        placeholder="Taper votre ville"
      />
      <Button title="Select state" onPress={citiesOption} />
      <DropDownPicker
        placeholder="Select state"
        open={openDropDown}
        value={valueDropDown}
        items={items}
        setOpen={setOpenDropDown}
        setValue={setValueDropDown}
        onSelectItem={(item) => doOnclick(item)}
        style={styles.dropdown}
      />
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
  dropdown: {
    marginTop: 20,
  },
});
