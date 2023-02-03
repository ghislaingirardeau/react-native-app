import { Text, View, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import CustomText from "./text/CustomText";
import globalStyle from "../assets/style/style";

export default function Summary({ city, sunrise, sunset }) {
  return (
    <View style={styles.container}>
      <CustomText size={24} family="Itim_400Regular">
        Lever : {moment(sunrise * 1000).format("H:mm:ss")}
      </CustomText>
      <CustomText size={24} family="Itim_400Regular">
        Coucher : {moment(sunset * 1000).format("H:mm:ss")}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.colorThird,
    padding: 15,
  },
  rowText: {
    color: globalStyle.colorSecond,
    fontSize: 24,
    fontWeight: "bold",
  },
});
