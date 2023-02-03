import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";

import TheLastCities from "../components/lastCities";
import GeoLocation from "../components/geoLocation";
import { useFonts, Handlee_400Regular } from "@expo-google-fonts/handlee"; // importer la font que l'on souhaite sur google

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
      if (
        lastCities.find((e) => e.name.toLowerCase() === city.toLowerCase()) ===
        undefined
      ) {
        let dataToSave = JSON.stringify({
          cities: [...lastCities, data.find((e) => e.state === state.value)],
        });
        await AsyncStorage.setItem("@myapp", dataToSave);
      }
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

  const loadResults = () => {
    if (items.length === 1) return doOnclick(items[0]);
    else return alert("Pick a state");
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

  let [fontsLoaded] = useFonts({
    Handlee_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContent}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCity}
          value={city}
          placeholder="Taper votre ville"
          onSubmitEditing={loadResults}
          //onSubmitEditing = to call the function when enter is click on the keyboard
        />
        <Ionicons
          style={[{ padding: 10 }]}
          name="search-outline"
          size={22}
          color="#118AB2"
        />
      </View>
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
      <TheLastCities
        lastCities={lastCities}
        navigation={navigation}
        setLastCities={setLastCities}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  clearBtn: {
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#EF476F",
    elevation: 3,
    borderRadius: 7,
    marginVertical: 10,
  },
  input: {
    height: 45,
    padding: 10,
    color: "#118AB2",
    fontSize: 16,
    fontWeight: "600",
    flex: 10,
    fontFamily: "Handlee_400Regular",
  },
});
