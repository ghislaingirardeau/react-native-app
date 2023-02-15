import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import TouchButton from "../components/Touchable";
import TextToSpeech from "../components/speech/textToSpeech";
import TextTranslator from "../components/speech/textTranslator";

export default function About({ route, navigation }) {
  const [textToTranslate, setTextToTranslate] = useState();
  const [translation, setTranslation] = useState("");
  // TRIGGER AN EVENT WHEN CHANGING THE NAVIGATION
  /* React.useEffect(() => {
    const onNavigateToAboutPage = navigation.addListener("focus", () => {});

    return onNavigateToAboutPage;
  }, [navigation]); */

  return (
    <View style={style.container}>
      <TouchButton setTextToTranslate={setTextToTranslate} />
      <TextTranslator
        textToTranslate={textToTranslate}
        setTextToTranslate={setTextToTranslate}
        translation={translation}
        setTranslation={setTranslation}
      />
      <TextToSpeech translation={translation} />
    </View>
  );
}

const style = StyleSheet.create({
  titleAbout: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    margin: 5,
  },
  container: {
    flex: 1,
    margin: 5,
  },
});
