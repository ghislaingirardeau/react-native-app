import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  Pressable,
  Image,
} from "react-native";
import moment from "moment";
import FadeInView from "./fadeRow";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./text/CustomText";
import globalStyle from "../assets/style/style";

export default function row({ item, index }) {
  const showToastWithGravity = (content) => {
    console.log(content);
    ToastAndroid.showWithGravity(
      `${content.weather[0].description}`,
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
      <Pressable onPress={() => showToastWithGravity(item)}>
        <View style={index == 0 ? styles.firstContainer : styles.container}>
          <View style={index == 0 ? styles.firstRowFull : styles.rowFull}>
            <Ionicons
              name={nameIcons(item.weather[0].icon)}
              size={index == 0 ? 72 : 52}
              color={"white"}
              style={[{ margin: "auto" }]}
            />
          </View>
          <View style={styles.rowHalf}>
            <CustomText size={index == 0 ? 28 : 18} family="Itim_400Regular">
              {dateFormat.day()}
            </CustomText>
          </View>
          <View style={styles.rowHalf}>
            <CustomText size={index == 0 ? 28 : 18} family="Itim_400Regular">
              {dateFormat.date()}
            </CustomText>
          </View>
          <View style={index == 0 ? styles.firstRowFull : styles.rowFull}>
            <CustomText
              size={index == 0 ? 46 : 26}
              style={styles.rowTemp}
              family="Itim_400Regular"
            >
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
    backgroundColor: globalStyle.colorPrimary,
    borderWidth: 2,
    borderColor: "#06D6A0",
    flexWrap: "wrap",
    justifyContent: "center",
    height: 100,
    paddingLeft: 20,
  },
  firstContainer: {
    backgroundColor: globalStyle.colorThird,
    borderBottomWidth: 2,
    borderBottomColor: "#06D6A0",
    flexWrap: "wrap",
    justifyContent: "center",
    height: 130,
    paddingLeft: 20,
  },
  rowFull: {
    width: 100,
    height: 80,
    justifyContent: "center",
  },
  firstRowFull: {
    width: 100,
    height: 130,
    justifyContent: "center",
  },
  rowHalf: {
    width: 100,
    height: 30,
    marginRight: 4,
  },
  rowTemp: {
    margin: "auto",
  },
});
