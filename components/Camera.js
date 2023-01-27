import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [value, setValue] = useState([]);
  const storeData = async () => {
    try {
      let array = JSON.stringify(["nantes", "bordeaux"]);
      await AsyncStorage.setItem("@myapp", array);
      console.log("value saved");
    } catch (e) {
      // saving error
    }
  };
  const loadData = async () => {
    try {
      let getArray = await AsyncStorage.getItem("@myapp");
      setValue(JSON.parse(getArray));
    } catch (e) {
      // saving error
    }
  };
  return (
    <View>
      <Text>Storage component</Text>
      <Button title="save" onPress={storeData} />
      <Button title="load" onPress={loadData} />

      {value.map((e, index) => (
        <Text key={index}>{e}</Text>
      ))}
    </View>
  );
}
