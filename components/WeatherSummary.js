import { ImageBackground, View, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import CustomText from "./text/CustomText";
import globalStyle from "../assets/style/style";

export default function Summary({ sunrise, sunset }) {
  return (
    <View>
      <ImageBackground
        source={require("../assets/sunrise.jpg")}
        resizeMode="cover"
        style={styles.container}
      >
        <CustomText
          size={34}
          family="Itim_400Regular"
          style={{ marginTop: 20, marginLeft: 20 }}
        >
          {moment(sunrise * 1000).format("H:mm:ss")}
        </CustomText>
      </ImageBackground>
      <ImageBackground
        source={require("../assets/sunset.jpg")}
        resizeMode="cover"
        style={styles.container}
      >
        <CustomText
          size={34}
          family="Itim_400Regular"
          style={{ marginTop: 20, marginLeft: 20 }}
        >
          {moment(sunset * 1000).format("H:mm:ss")}
        </CustomText>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    height: 130,
  },
  rowText: {
    color: globalStyle.colorSecond,
    fontSize: 24,
    fontWeight: "bold",
  },
});
