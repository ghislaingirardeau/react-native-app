import { View, Text, Pressable, TextInput, Button } from "react-native";
import modalStyle from "../../assets/style/modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";

export default function ModalFirstSettings({ showModal, setModal, setCards }) {
  //DEBUG IF USE STATE, DONT SHOW THE SELECT BECAUSE REACTIVE
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromLabel, setFromLabel] = useState("Native lang");
  const [toLabel, setToLabel] = useState("Learning lang");

  const data = [
    { key: "fr-FR", label: "French" },
    { key: "en-US", label: "English" },
    { key: "km-KM", label: "Khmer" },
  ];

  const _selectFrom = (option) => {
    setFrom(option.key);
    setFromLabel(option.label);
    setTo("");
  };

  const _selectTo = (option) => {
    setTo(option.key);
    setToLabel(option.label);
  };

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
          <ModalSelector
            data={data}
            initValue={fromLabel}
            initValueTextStyle={{ color: "black" }}
            onChange={(option) => _selectFrom(option)}
            style={{ marginVertical: 10 }}
          />
          <ModalSelector
            data={data.filter((e) => e.key != from)}
            initValue={toLabel}
            initValueTextStyle={{ color: "black" }}
            onChange={(option) => _selectTo(option)}
          />
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
