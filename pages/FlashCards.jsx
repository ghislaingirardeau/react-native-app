import { View, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import CustomText from "../components/text/CustomText.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalNewCard from "../components/modal/ModalNewCard";
import ModalSettings from "../components/modal/ModalSettings";

import { useSelector, useDispatch } from "react-redux";
import { cleanAll } from "../redux/actions/cardsAction";

export default function FlashCards({ navigation }) {
  const [modal, setModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);

  const cardsStore = useSelector((store) => store.flashCards.cards);
  const settings = useSelector((store) => store.flashCards.languages);
  const dispatch = useDispatch();

  const loadData = () => {
    console.log("settings");
    if (Object.keys(settings).length === 0) {
      setSettingsModal(true);
    }
  };

  const clearStorage = async () => {
    dispatch(cleanAll());
    setSettingsModal(true);
  };

  const createCategory = () => {
    setModal(true);
  };

  const showCard = (item) => {
    navigation.navigate("Card", {
      category: item.title, // pour le nom de la route
      category_id: item.id,
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
        {cardsStore.length > 0
          ? cardsStore.map((item, i) => {
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
                    <CustomText
                      size={20}
                      family="Itim_400Regular"
                      style={style.cardsText}
                    >
                      {item.lastUpdate}
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
      <ModalNewCard showModal={modal} setModal={setModal} />
      <ModalSettings showModal={settingsModal} setModal={setSettingsModal} />
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
