import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import React from "react";
import CameraApp from "../components/Camera";

export default function About({ route, navigation }) {
  console.log(navigation);
  // TO GET THE PARAMS OF THE ROUTE FROM THE PARENT
  if (route.params) {
    const { itemId, otherParam } = route.params;
    console.log(itemId, otherParam);
  }
  // TRIGGER AN EVENT WHEN CHANGING THE NAVIGATION
  React.useEffect(() => {
    const onNavigateToAboutPage = navigation.addListener("focus", () => {
      console.log(route);
    });

    return onNavigateToAboutPage;
  }, [navigation]);

  const [loader, setLoader] = React.useState(true);
  const doOnclick = () => {
    setLoader(!loader);
  };
  return (
    <View style={style.container}>
      <Text style={style.titleAbout}>I'm the component About</Text>
      <Text>This is the description her</Text>
      <Button title="Press me" onPress={doOnclick} />
      <ActivityIndicator animating={loader} size="large" color="green" />
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
    margin: 5,
    borderColor: "blue",
    borderWidth: 2,
    borderStyle: "solid",
  },
});