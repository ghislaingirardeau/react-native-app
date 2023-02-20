import { View, Text, Pressable, TextInput, Button } from "react-native";
import modalStyle from "../../assets/style/modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FadeInView from "../fadeRow";

import { useDispatch } from "react-redux";
import { addCard } from "../../redux/actions/cardsAction";

export default function ModalNewCard({ showModal, setModal }) {
  const [name, setName] = useState("");
  const [triggerAnim, setTriggerAnim] = useState(true);

  const dispatch = useDispatch();

  /* const addCard = (newItem) => {
    return new Promise(async (resolve, reject) => {
      let concat = cards;
      concat[0].datas.push(newItem);
      setCards(concat);
      await AsyncStorage.setItem("@flashCardLang", JSON.stringify(concat));
      resolve(true);
    });
  }; */

  const _addCategory = async () => {
    if (name.length > 3) {
      const newItem = {
        id: Date.now(),
        title: name.trim(),
        lastUpdate: "xxx",
        createOn: Date.now(),
      };
      /* await addCard(newItem); */
      dispatch(addCard(newItem));
      setName("");
      _triggerAnim();
    } else {
      // CHECK EMPTY TOO SHORT TOO LONG IF EXIST
      console.log("the name is too short");
    }
  };

  const _triggerAnim = () => {
    setTriggerAnim(!triggerAnim);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      setTriggerAnim(true);
    }, 500);
  });

  if (showModal) {
    return (
      <FadeInView triggerAnim={triggerAnim} style={modalStyle.modalContainer}>
        <View>
          <View style={modalStyle.modalHeader}>
            <Text style={modalStyle.modalTitle}>Add Category</Text>
            <Pressable onPress={_triggerAnim}>
              <Ionicons
                name={"close-circle-outline"}
                size={44}
                color={"grey"}
              />
            </Pressable>
          </View>
          <View style={modalStyle.modalContent}>
            <TextInput
              style={modalStyle.modalInput}
              selectionColor={modalStyle.colorSecond}
              cursorColor={modalStyle.colorSecond}
              onChangeText={setName}
              value={name}
              placeholder="Category name"
            />
          </View>
          <View style={modalStyle.modalFooter}>
            <Button
              onPress={_addCategory}
              title="Create"
              color={modalStyle.colorPrimary}
              accessibilityLabel="create category button"
            />
          </View>
        </View>
      </FadeInView>
    );
  }
}
