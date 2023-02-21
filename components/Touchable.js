import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Pressable,
} from "react-native";
import Voice from "@react-native-voice/voice";
import Ionicons from "react-native-vector-icons/Ionicons";
import Translate from "../components/speech/translateFunction";

export default function TouchButton(props) {
  const [rippleColor, setRippleColor] = useState("#FFF000");
  const [results, setResults] = useState(); // EMPTY

  const speechStart = async () => {
    try {
      let res = await Voice.start(props.settings.from); //km-KM
    } catch (error) {
      console.log("from start", error);
    }
  };
  const speechStop = async () => {
    try {
      let response = await Voice.stop();
    } catch (error) {
      console.log("from stop", error);
    }
  };

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (results) => {
    setResults(results.value);
  };
  const onSpeechError = (error) => {
    alert("Pas de texte enregistrer");
    // MESSAGE SI PAS DE SPEECH RECORDED
  };

  const textSelected = async (text) => {
    let result = await Translate(text);
    result
      ? props.setTextToTranslate({
          id: Date.now(),
          from: text,
          to: result,
          pronounce: "xxx",
        })
      : null;
  };
  return (
    <View style={styles.container}>
      {results
        ? results.map((data, index) => (
            <Pressable
              onPress={() => textSelected(data)}
              key={index}
              style={styles.selection}
            >
              <Text>{data}</Text>
            </Pressable>
          ))
        : undefined}
      {/* <TouchableNativeFeedback
        onPressOut={speechStop}
        onPressIn={speechStart}
        background={TouchableNativeFeedback.Ripple(rippleColor, true)}
      > */}
      <View style={styles.touchable}>
        <Ionicons name={"ios-mic-outline"} size={55} color={"red"} />
      </View>
      {/* </TouchableNativeFeedback> */}
    </View>
  );
}

/* const randomHexColor = () => {
  return "#000000".replace(/0/g, function () {
    return Math.round(Math.random() * 16).toString(16);
  });
}; */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  touchable: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selection: {
    padding: 15,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});
