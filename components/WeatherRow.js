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
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./text/CustomText";

export default function row({ item, index }) {
  const showToastWithGravity = (content) => {
    ToastAndroid.showWithGravity(
      `${content}`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
  };

  const nameIcons = (icons) => {
    switch (icons) {
      case "01d":
        return "sunny-outline";
        break;
      case "02d":
        return "partly-sunny-outline";
        break;
      case "03d":
        return "cloudy-outline";
        break;
      case "04d":
        return "cloudy-outline";
        break;
      case "09d":
        return "rainy-outline";
        break;
      case "10d":
        return "rainy-outline";
        break;
      case "11d":
        return "thunderstorm-outline";
        break;
      case "13d":
        return "snow-outline";
        break;
    }
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
          <View style={styles.rowFull}>
            <Ionicons
              name={nameIcons(item.weather[0].icon)}
              size={62}
              color={"white"}
              style={[{ margin: "auto" }]}
            />
          </View>
          <View style={styles.rowHalf}>
            <CustomText size={18}>{dateFormat.day()}</CustomText>
          </View>
          <View style={styles.rowHalf}>
            <CustomText size={18}>{dateFormat.date()}</CustomText>
          </View>
          <View style={styles.rowFull}>
            <CustomText size={36} style={styles.rowTemp}>
              {Math.floor(item.main.temp)}°C
            </CustomText>
          </View>
        </View>
      </Pressable>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#073B4C",
    borderWidth: 2,
    borderColor: "#06D6A0",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    height: 130,
  },
  rowFull: {
    width: 100,
    height: 100,

    justifyContent: "center",
  },
  rowHalf: {
    width: 100,
    height: 40,
    marginRight: 4,
  },
  rowTemp: {
    margin: "auto",
  },
});
