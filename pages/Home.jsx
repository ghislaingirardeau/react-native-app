import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import globalStyle from "../assets/style/style";

import TheLastCities from "../components/lastCities";
import GeoLocation from "../components/geoLocation";
import SelectModal from "../components/modal/ModalSelect";
import { useFonts, Handlee_400Regular } from "@expo-google-fonts/handlee"; // importer la font que l'on souhaite sur google

export default function Home({ navigation }) {
  const [lastCities, setLastCities] = useState([]);
  const [city, onChangeCity] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const loadData = async () => {
    try {
      let getStorage = await AsyncStorage.getItem("@myapp");
      getStorage ? setLastCities(JSON.parse(getStorage).cities) : "";
    } catch (e) {
      alert("from load", e);
    }
  };

  const doOnclick = async (element) => {
    console.log(element);
    const { lat, lon } = element;
    try {
      if (lastCities.find((e) => e.name === element.name) === undefined) {
        let dataToSave = JSON.stringify({
          cities: [...lastCities, element],
        });
        await AsyncStorage.setItem("@myapp", dataToSave);
      }
    } catch (e) {
      alert(e);
    }
    setShowModal(false);
    navigation.navigate("Results", {
      // TO PASS PARAMS TO THE ROUTE
      lat,
      lon,
      city: element.name,
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
        setShowModal(true);
        setData(clearData2);
      }
    }
  };

  const loadResults = () => {
    if (data.length === 1) return doOnclick(data[0]);
    else return alert("Pick a state");
  };

  const clearData = () => {
    setData([]);
    onChangeCity("");
  };

  useEffect(() => {
    citiesOption();
  }, [city]);

  useEffect(() => {
    loadData();
  }, []);

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
          onFocus={clearData}
          //onSubmitEditing = to call the function when enter is click on the keyboard
        />
        {data.length === 1 ? (
          <Ionicons
            style={[{ padding: 5, position: "absolute", right: 7 }]}
            name="checkmark-circle-outline"
            size={28}
            color={globalStyle.colorThird}
          />
        ) : (
          <Ionicons
            style={[{ padding: 5, position: "absolute", right: 7 }]}
            name="search-outline"
            size={28}
            color={globalStyle.colorFourth}
          />
        )}
      </View>

      <GeoLocation navigation={navigation} />
      <TheLastCities
        lastCities={lastCities}
        navigation={navigation}
        setLastCities={setLastCities}
      />
      <SelectModal datas={data} doOnclick={doOnclick} showModal={showModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: globalStyle.colorSecond,
  },
  clearBtn: {
    marginTop: 20,
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 20,
  },
  input: {
    height: 45,
    padding: 10,
    color: globalStyle.colorThird,
    borderWidth: 2,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 5,
    flex: 5,
    fontFamily: "Handlee_400Regular",
    borderColor: globalStyle.colorThird,
  },
});
