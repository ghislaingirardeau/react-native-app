import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import CustomText from "../components/text/CustomText.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalNewCard from "../components/modal/ModalNewCard";

// JSON DB
/* 
{
    [
        {
            langToLearn: "km",
            nativeLang: "fr",
            datas : [
                { 
                    id: CAT-Timestamp, 
                    title: "Fruits", 
                    date: Date.now(), 
                    myList: [
                        {
                            id : Word-Timestamp, 
                            from, 
                            to, 
                            pronounce
                        }
                    ] 
                },
            ],
            createOn,
            lastChangeOn
        }
    ]
}
*/

export default function FlashCards({ navigation }) {
  const [cards, setCards] = useState([
    { id: 1, title: "Fruits", date: Date.now() },
    { id: 2, title: "Vegetable", date: Date.now() },
  ]);
  const [modal, setModal] = useState(false);

  const createCategory = () => {
    console.log("show modal");
    setModal(true);
    // show modal
    // input name
    // on valid = add a new card in cards & localStorage
  };

  const showCard = (item) => {
    console.log(item);
    // go to the nav Card with params id

    navigation.navigate("Card", {
      category: item.title,
      id: item.id,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={style.cardsContainer}>
        {cards.map((item, i) => {
          return (
            <Pressable
              key={item.id}
              onPress={() => showCard(item)}
              android_ripple={{ color: "blue", borderless: false }}
            >
              <View style={style.cardsLayout}>
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
        })}

        <Pressable
          onPress={createCategory}
          android_ripple={{ color: "red", borderless: false }}
        >
          <View style={style.cardsLayout}>
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
  },
  cardsLayout: {
    borderWidth: 2,
    borderColor: "black",
    margin: 5,
    padding: 5,
  },
  cardsText: {},
});
