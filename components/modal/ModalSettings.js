import { View, Text, Pressable, TextInput, Button } from "react-native";
import modalStyle from "../../assets/style/modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";

export default function SelectModal({ showModal, setModal, cards, setCards }) {
  const [name, setName] = useState("");

  const addCard = (newItem) => {
    return new Promise((resolve, reject) => {
      setCards([...cards, newItem]);
      resolve(true);
    });
  };

  const _addCategory = async () => {
    if (name.length > 3) {
      const newItem = {
        id: Date.now(),
        title: name,
        date: Date.now(),
      };
      let res = await addCard(newItem);
      res ? setModal(false) : undefined;
    } else {
      // CHECK EMPTY TOO SHORT TOO LONG IF EXIST
      console.log("the name is too short");
    }
  };

  if (showModal) {
    return (
      <View style={modalStyle.modalContainer}>
        <View style={modalStyle.modalHeader}>
          <Text style={modalStyle.modalTitle}>Add Category</Text>
          <Pressable onPress={() => setModal(false)}>
            <Ionicons name={"close-circle-outline"} size={44} color={"red"} />
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
            color="#841584"
            accessibilityLabel="create category button"
          />
        </View>
      </View>
    );
  }
}
