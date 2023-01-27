import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    if (city.length > 2) {
      const geoloc = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city},fr&limit=5&appid=e3b9191867c7ac728751e62e58afde2d&lang=fr`
      );
      const result = await geoloc.json();
      if (result) {
        let clearData1 = result.filter((e) => e.local_names);
        let clearData2 = clearData1.filter(
          (v, i, a) => a.findIndex((v2) => v2.state === v.state) === i
        );
        setData(clearData2);

        const states = clearData2.map((item) => {
          const container = {};

          container.value = item.state;
          container.label = item.state;

          return container;
        });
        setItems(states);
      }
    }
  };

  const clearData = () => {
    setItems([]);
    setData([]);
    onChangeCity("");
  };

  React.useEffect(() => {
    citiesOption();
  }, [city]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCity}
        value={city}
        placeholder="Taper votre ville"
      />
      {items.length > 0 ? (
        <View>
          <DropDownPicker
            placeholder="Région"
            open={openDropDown}
            value={valueDropDown}
            items={items}
            setOpen={setOpenDropDown}
            setValue={setValueDropDown}
            onSelectItem={(item) => doOnclick(item)}
          />
          <View style={styles.clearBtn}>
            <Button title="clear" onPress={clearData} />
          </View>
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  clearBtn: {
    marginTop: 20,
  },
});
