import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import TouchButton from "../components/Touchable";
import CameraApp from "../components/Camera";
import TextToSpeech from "../components/speech/textToSpeech";
import TextTranslator from "../components/speech/textTranslator";
import ImagePickerExample from "../components/ImagePicker";

export default function About({ route, navigation }) {
  // TO GET THE PARAMS OF THE ROUTE FROM THE PARENT
  if (route.params) {
    const { itemId, otherParam } = route.params;
    console.log(itemId, otherParam);
  }
  const [textToTranslate, setTextToTranslate] = useState();
  // TRIGGER AN EVENT WHEN CHANGING THE NAVIGATION
  /* React.useEffect(() => {
    const onNavigateToAboutPage = navigation.addListener("focus", () => {});

    return onNavigateToAboutPage;
  }, [navigation]); */

  return (
    <View style={style.container}>
      {/* <CameraApp /> */}
      <TouchButton setTextToTranslate={setTextToTranslate} />
      <TextTranslator
        textToTranslate={textToTranslate}
        setTextToTranslate={setTextToTranslate}
      />
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
