import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import CustomText from "../components/text/CustomText.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalNewCard from "../components/modal/ModalNewCard";
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
            id: "Word1 -" + Date.now(),
            from: "banane",
            to: "banana",
            pronounce: "xxx",
          },
          {
            id: "Word2 -" + Date.now(),
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
  const [cards, setCards] = useState(testDataFromLS);
  const [modal, setModal] = useState(false);

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("@flashCardLang");

      if (value === null) {
        console.log("dont exist");
        // SET APP : lang from & to
        // CREATE FIRST CATEGORY
      } else {
        setCards(JSON.parse(value));
        // POPUP WHICH LANG DATA TO LOAD
        // LOAD SELECTED LANG LOCAL STORAGE INSIDE CARDS
      }
    } catch (e) {
      // error reading value
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("@flashCardLang");
      setCards([]);
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = () => {
    setModal(true);

    // show modal
    // input name
    // on valid = add a new card in cards & localStorage
  };

  const showCard = (item) => {
    navigation.navigate("Card", {
      category: item.title, // pour le nom de la route
      id: item.id,
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
        {cards[0].datas
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
          : undefined}

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
  },
  cardsText: {},
});
