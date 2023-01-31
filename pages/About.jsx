import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import TouchButton from "../components/Touchable";
import CameraApp from "../components/Camera";

export default function About({ route, navigation }) {
  // TO GET THE PARAMS OF THE ROUTE FROM THE PARENT
  if (route.params) {
    const { itemId, otherParam } = route.params;
    console.log(itemId, otherParam);
  }
  // TRIGGER AN EVENT WHEN CHANGING THE NAVIGATION
  React.useEffect(() => {
    const onNavigateToAboutPage = navigation.addListener("focus", () => {});

    return onNavigateToAboutPage;
  }, [navigation]);

  return (
    <View style={style.container}>
      <CameraApp />
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
