import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Speech from "expo-speech";
import TouchButton from "../components/Touchable";

import { useSelector, useDispatch } from "react-redux";
import { addItemInCard } from "../redux/actions/cardsAction";

export default function CardPage({ route, navigation }) {
  const [itemsList, setItemsList] = useState();

  const { category, category_id } = route.params;
  const cardItems = useSelector((store) => store.flashCards.cardItems);
  const settings = useSelector((store) => store.flashCards.languages);
  const cards = useSelector((store) => store.flashCards.cards);

  const dispatch = useDispatch();

  const addTraduction = async (item) => {
    if (item) {
      await dispatch(addItemInCard(item, category));
    }
  };

  const [textToTranslate, setTextToTranslate] = useState();

  const _playTranslation = (text) => {
    const thingToSay = text;
    Speech.speak(thingToSay, {
      language: settings.to.slice(0, 2),
      rate: 0.6, // the voice speed
      onStart: () => console.log("start"), // FOR ANIMATION TO SET
      onDone: () => console.log("done"),
    });
  };

  useEffect(() => {
    addTraduction(textToTranslate);
  }, [textToTranslate]);

  useEffect(() => {
    setItemsList(cardItems[category]);
  }, [cardItems]);

  return (
    <View style={style.container}>
      {itemsList
        ? itemsList.map((item, index) => {
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
          })
        : undefined}
      <TouchButton
        setTextToTranslate={setTextToTranslate}
        settings={settings}
      />
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
