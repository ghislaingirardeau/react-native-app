import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import * as Speech from "expo-speech";

export default function textToSpeech(props) {
  const speak = () => {
    const thingToSay = `${props.translation}`;
    Speech.speak(thingToSay, { language: "km" });
    console.log(Speech.maxSpeechInputLength, thingToSay.length);
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} />
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
});
