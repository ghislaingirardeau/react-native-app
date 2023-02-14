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

export default function TouchButton(props) {
  const [rippleColor, setRippleColor] = useState("#FFF000");
  const [results, setResults] = useState();

  const speechStart = async () => {
    try {
      let res = await Voice.start("fr-FR"); //km-KM
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
    console.error("si pas de speech", error);
    // MESSAGE SI PAS DE SPEECH RECORDED
  };

  const textSelected = (text) => {
    props.setTextToTranslate(text);
  };
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        /* onPress={() => {
          setRippleColor(randomHexColor());
        }} */
        onPressOut={speechStop}
        onPressIn={speechStart}
        background={TouchableNativeFeedback.Ripple(rippleColor, true)}
      >
        <View style={styles.touchable}>
          <Ionicons name={"ios-mic-outline"} size={85} color={"red"} />
        </View>
      </TouchableNativeFeedback>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  touchable: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selection: {
    padding: 8,
    margin: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});
