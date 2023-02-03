import { Text, View, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import CustomText from "./text/CustomText";

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
    backgroundColor: "#118AB2",
    padding: 15,
  },
  rowText: {
    color: "#FFD166",
    fontSize: 24,
    fontWeight: "bold",
  },
});
