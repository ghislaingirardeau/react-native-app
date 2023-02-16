import { View, Text, Pressable, TextInput, Button } from "react-native";
import modalStyle from "../../assets/style/modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalFirstSettings({ showModal, setModal, setCards }) {
  const [to, setTo] = useState("fr-FR");
  const [from, setFrom] = useState("en-US");

  const _addLangSettings = async () => {
    const setLanguage = [
      {
        langToLearn: to,
        nativeLang: from,
        datas: [],
        createOn: Date.now(),
        lastChangeOn: "xxx",
      },
    ];
    try {
      await AsyncStorage.setItem("@flashCardLang", JSON.stringify(setLanguage));
      setCards(setLanguage);
      setModal(false);
    } catch (error) {}
  };

  if (showModal) {
    return (
      <View style={modalStyle.modalContainer}>
        <View style={modalStyle.modalHeader}>
          <Text style={modalStyle.modalTitle}>Languages</Text>
          <Pressable onPress={() => setModal(false)}>
            <Ionicons name={"close-circle-outline"} size={44} color={"red"} />
          </Pressable>
        </View>
        <View style={modalStyle.modalContent}>
          <Button
            onPress={() => setFrom("fr")}
            title="from FR"
            color="#841584"
          />
          <Button onPress={() => setTo("en")} title="To EN" color="#841584" />
        </View>
        <View style={modalStyle.modalFooter}>
          <Button
            onPress={_addLangSettings}
            title="Start"
            color="#841584"
            accessibilityLabel="create category button"
          />
        </View>
      </View>
    );
  }
}
