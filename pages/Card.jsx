import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Speech from "expo-speech";

export default function CardPage({ route, navigation }) {
  const list = JSON.parse(route.params.list);

  const [category, setCategory] = useState(JSON.parse(route.params.data));
  console.log(category);
  list.push(
    {
      id: "Word1 -",
      from: "J'aime manger les bananes",
      to: "I like to eat banana",
      pronounce: "xxx",
    },
    {
      id: "Word2 -",
      from: "pomme",
      to: "Apple",
      pronounce: "xxx",
    }
  );

  const _playTranslation = (text) => {
    const thingToSay = text;
    Speech.speak(thingToSay, {
      language: category.langToLearn,
      rate: 0.6, // the voice speed
      onStart: () => console.log("start"), // FOR ANIMATION TO SET
      onDone: () => console.log("done"),
    });
  };

  return (
    <View style={style.container}>
      <Text>Card page</Text>
      {list.map((item, index) => {
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
