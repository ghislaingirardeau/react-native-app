import { View, Text, Pressable, TextInput, Button } from "react-native";
import modalStyle from "../../assets/style/modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";

export default function ModalNewCard({ showModal, setModal, cards, setCards }) {
  const [name, setName] = useState("");

  const addCard = (newItem) => {
    return new Promise((resolve, reject) => {
      let concat = cards;
      concat[0].datas.push(newItem);
      setCards([...concat]);
      resolve(true);
    });
  };

  const _addCategory = async () => {
    if (name.length > 3) {
      const newItem = {
        id: Date.now(),
        title: name,
        date: Date.now(),
        myList: [],
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
            <Ionicons name={"close-circle-outline"} size={44} color={"grey"} />
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
    );
  }
}
