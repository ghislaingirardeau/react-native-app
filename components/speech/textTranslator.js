import { useState } from "react";
import { View, StyleSheet, Button, TextInput, Text } from "react-native";
import globalStyle from "../../assets/style/style";
import { RAPIDAPI_TRANSLATE_KEY, RAPIDAPI_TRANSLATE_HOST } from "@env";

import axios from "axios";

export default function textTranslator(props) {
  const translate = () => {
    const data = {
      from: "fr",
      to: "km",
      e: "",
      q: [`${props.textToTranslate}`],
    };
    const options = {
      method: "POST",
      url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": `${RAPIDAPI_TRANSLATE_KEY}`,
        "X-RapidAPI-Host": `${RAPIDAPI_TRANSLATE_HOST}`,
      },
      data: JSON.stringify(data),
    };

    axios
      .request(options)
      .then(function (response) {
        props.setTranslation(response.data[0]);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        selectionColor={globalStyle.colorSecond}
        cursorColor={globalStyle.colorSecond}
        onChangeText={props.setTextToTranslate}
        value={props.textToTranslate}
        placeholder="Translate"
      />
      <Button title="translate" onPress={translate} />
      {props.translation ? <Text>{props.translation}</Text> : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  input: {
    height: 45,
    padding: 10,
    color: globalStyle.colorPrimary,
    borderWidth: 2,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 5,
    fontFamily: "Handlee_400Regular",
    borderColor: globalStyle.colorPrimary,
  },
});
