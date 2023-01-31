import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";

import TheLastCities from "../components/lastCities";
import GeoLocation from "../components/geoLocation";

export default function Home({ navigation }) {
  const [lastCities, setLastCities] = useState([]);
  const [city, onChangeCity] = useState("");
  const [data, setData] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [valueDropDown, setValueDropDown] = useState(null);
  const [items, setItems] = useState([]);

  const loadData = async () => {
    try {
      let getStorage = await AsyncStorage.getItem("@myapp");
      getStorage ? setLastCities(JSON.parse(getStorage).cities) : "";
    } catch (e) {
      alert("from load", e);
    }
  };

  const doOnclick = async (state) => {
    const { lat, lon } = data.find((e) => e.state === state.value);
    try {
      let dataToSave = JSON.stringify({
        cities: [...lastCities, data.find((e) => e.state === state.value)],
      });
      await AsyncStorage.setItem("@myapp", dataToSave);
    } catch (e) {
      alert(e);
    }
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
        `http://api.openweathermap.org/geo/1.0/direct?q=${city},fr&limit=5&appid=${API_KEY}&lang=fr`
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

  useEffect(() => {
    citiesOption();
    loadData();
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
      <GeoLocation navigation={navigation} />
      <TheLastCities lastCities={lastCities} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 45,
    borderWidth: 2,
    borderColor: "#EF476F",
    borderRadius: 7,
    padding: 10,
    marginBottom: 20,
    color: "#118AB2",
    fontSize: 16,
    fontWeight: "600",
  },
  clearBtn: {
    marginTop: 20,
  },
});
