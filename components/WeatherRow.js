import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import moment from "moment";
import FadeInView from "./fadeRow";

export default function row({ item, index }) {
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
    <FadeInView delay={index * 100}>
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
            <Image
              style={styles.tinyLogo}
              source={{
                uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
              }}
            />
          </View>
        </View>
      </Pressable>
    </FadeInView>
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
  tinyLogo: {
    width: 80,
    height: 80,
  },
});
