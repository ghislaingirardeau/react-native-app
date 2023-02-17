import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Speech from "expo-speech";
import TouchButton from "../components/Touchable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextTranslator from "../components/speech/textTranslator";

export default function CardPage({ route, navigation }) {
  const [listTraduction, setListTrad] = useState(JSON.parse(route.params.list));
  const { category_id } = route.params;
  const [dataLS, setDataLS] = useState();

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("@flashCardLang");
      if (value === null) {
      } else {
        setDataLS(JSON.parse(value));
        console.log(dataLS[0].datas[0].myList);
        //DEBUG RELOAD ON NAVIGATION
      }
    } catch (e) {}
  };

  const addTraduction = async (item) => {
    if (item) {
      let newList = [...listTraduction, item];
      setListTrad(newList);
      let index = dataLS[0].datas.findIndex((e) => e.id === category_id);
      setDataLS(dataLS[0].datas[index]?.myList.push(...newList));
      console.log("addTraduction", dataLS);
      await AsyncStorage.setItem("@flashCardLang", JSON.stringify(dataLS));
    }
  };

  const [textToTranslate, setTextToTranslate] = useState();
  /* const [translation, setTranslation] = useState(""); */

  const _playTranslation = (text) => {
    const thingToSay = text;
    Speech.speak(thingToSay, {
      language: dataLS[0].langToLearn.slice(0, 2),
      rate: 0.6, // the voice speed
      onStart: () => console.log("start"), // FOR ANIMATION TO SET
      onDone: () => console.log("done"),
    });
  };

  useEffect(() => {
    addTraduction(textToTranslate);
  }, [textToTranslate]);

  useEffect(() => {
    /* console.log(navigation.isFocused()); */
    loadData();
  }, []);

  return (
    <View style={style.container}>
      <Text>Card page</Text>
      {listTraduction.map((item, index) => {
        return (
          <View key={item.id} style={style.cardTranslate}>
            <Text style={style.cardTranslateText}>{item.from}</Text>
            <Pressable onPress={() => _playTranslation(item.to)}>
              <Ionicons
                name={"volume-medium-outline"}
                size={34}
                color={"red"}
                style={style.cardTranslateIcon}
              />
            </Pressable>
            <Text style={style.cardTranslateText}>{item.to}</Text>
          </View>
        );
      })}
      <TouchButton setTextToTranslate={setTextToTranslate} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  cardTranslate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
  },
  cardTranslateText: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
    width: "45%",
  },
  cardTranslateIcon: {
    padding: 10,
  },
});
