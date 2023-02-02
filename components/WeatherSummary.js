import { Text, View, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import CustomText from "./text/CustomText";

export default function Summary({ city, sunrise, sunset }) {
  return (
    <View style={styles.container}>
      <CustomText size={24}>
        Sunrise : {moment(sunrise * 1000).format("h:mm:ss a")}
      </CustomText>
      <CustomText size={24}>
        Sunset : {moment(sunset * 1000).format("h:mm:ss a")}
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
