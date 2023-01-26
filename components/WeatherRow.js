import { Text, View, StyleSheet, ToastAndroid, Pressable } from "react-native";
import React from "react";
import moment from "moment";

export default function row({ item }) {
  const showToastWithGravity = (content) => {
    ToastAndroid.showWithGravity(
      `${content}`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
  };

  const dateFormat = {
    day: () => {
      return moment(item.dt * 1000).format("ddd");
    },
    date: () => {
      return moment(item.dt * 1000).format("DD/MM");
    },
    hours: () => {
      return moment(item.dt * 1000).hour();
    },
  };
  return (
    <Pressable onPress={() => showToastWithGravity(item.dt_txt)}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {dateFormat.day()} {dateFormat.date()}
          </Text>
          <Text style={styles.rowText}>{dateFormat.hours()}h</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>{item.main.temp}°C</Text>
          <Text style={styles.rowText}>{item.weather[0].description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#073B4C",
    padding: 15,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#06D6A0",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  rowText: {
    color: "#FFD166",
    fontSize: 24,
  },
});
