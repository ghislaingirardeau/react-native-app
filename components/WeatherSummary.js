import { Text, View, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";

export default function Summary({ city, sunrise, sunset }) {
  return (
    <View style={styles.container}>
      <Text style={styles.rowText}>{city}</Text>
      <Text style={styles.rowText}>
        Sunrise : {moment(sunrise * 1000).format("h:mm:ss a")}
      </Text>
      <Text style={styles.rowText}>
        Sunset : {moment(sunset * 1000).format("h:mm:ss a")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#118AB2",
    padding: 15,
    marginBottom: 5,
  },
  rowText: {
    color: "#FFD166",
    fontSize: 24,
    fontWeight: "bold",
  },
});
