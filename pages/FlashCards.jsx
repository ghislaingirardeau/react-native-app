import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import CustomText from "../components/text/CustomText.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalNewCard from "../components/modal/ModalNewCard";
import ModalSettings from "../components/modal/ModalSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const testDataFromLS = [
  {
    langToLearn: "km",
    nativeLang: "fr",
    datas: [
      {
        id: "CAT1 -" + Date.now(),
        title: "Fruits",
        date: Date.now(),
        myList: [
          {
            id: "Word1 -",
            from: "banane",
            to: "banana",
            pronounce: "xxx",
          },
          {
            id: "Word2 -",
            from: "pomme",
            to: "Apple",
            pronounce: "xxx",
          },
        ],
      },
      {
        id: "CAT2 -" + Date.now(),
        title: "Vegetables",
        date: Date.now(),
        myList: [
          {
            id: "Word2 -" + Date.now(),
            from: "carrote",
            to: "carot",
            pronounce: "xxx",
          },
        ],
      },
    ],
    createOn: "xxx",
    lastChangeOn: "xxx",
  },
];

export default function FlashCards({ navigation }) {
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("@flashCardLang");
      if (value === null) {
        setSettingsModal(true);
      } else {
        setCards(JSON.parse(value));
      }
    } catch (e) {}
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("@flashCardLang");
      setCards([]);
      setSettingsModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = () => {
    setModal(true);
  };

  const showCard = (item) => {
    navigation.navigate("Card", {
      category: item.title, // pour le nom de la route
      category_id: item.id,
      list: JSON.stringify(item.myList),
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={style.cardsContainer}>
        {cards.length > 0
          ? cards[0].datas.map((item, i) => {
              return (
                <Pressable
                  key={item.id}
                  onPress={() => showCard(item)}
                  android_ripple={{ color: "blue", borderless: false }}
                  style={style.cardsLayout}
                >
                  <View>
                    <CustomText
                      size={20}
                      family="Itim_400Regular"
                      style={style.cardsText}
                    >
                      {item.title}
                    </CustomText>
                    <CustomText size={20} family="Itim_400Regular">
                      {item.date}
                    </CustomText>
                  </View>
                </Pressable>
              );
            })
          : null}

        <Pressable
          onPress={createCategory}
          android_ripple={{ color: "red", borderless: false }}
          style={style.cardsLayout}
        >
          <View>
            <CustomText size={20} family="Itim_400Regular">
              Add one
            </CustomText>
            <Ionicons
              name={"add-circle-outline"}
              size={64}
              color={"red"}
              style={{ textAlign: "center" }}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={clearStorage}
          android_ripple={{ color: "red", borderless: false }}
          style={style.cardsLayout}
        >
          <View>
            <CustomText size={20} family="Itim_400Regular">
              Clear LS
            </CustomText>
            <Ionicons
              name={"trash-outline"}
              size={64}
              color={"red"}
              style={{ textAlign: "center" }}
            />
          </View>
        </Pressable>
      </View>
      <ModalNewCard
        showModal={modal}
        setModal={setModal}
        setCards={setCards}
        cards={cards}
      />
      <ModalSettings
        showModal={settingsModal}
        setModal={setSettingsModal}
        setCards={setCards}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  cardsLayout: {
    borderWidth: 2,
    borderColor: "black",
    margin: 5,
    padding: 5,
    height: 100,
    width: "45%",
  },
  cardsText: {},
});
