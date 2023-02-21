import { View, Text, Pressable, TextInput, Button } from "react-native";
import modalStyle from "../../assets/style/modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import ModalSelector from "react-native-modal-selector";

import { useDispatch } from "react-redux";
import { initSettings } from "../../redux/actions/cardsAction";

export default function ModalFirstSettings({ showModal, setModal }) {
  //DEBUG IF USE STATE, DONT SHOW THE SELECT BECAUSE REACTIVE
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromLabel, setFromLabel] = useState("Native lang");
  const [toLabel, setToLabel] = useState("Learning lang");

  const dispatch = useDispatch();

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
    const setLanguage = {
      from,
      to,
    };
    dispatch(initSettings(setLanguage));
    setModal(false);
  };

  if (showModal) {
    return (
      <View style={modalStyle.modalContainer}>
        <View style={modalStyle.modalHeader}>
          <Text style={modalStyle.modalTitle}>Languages</Text>
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
