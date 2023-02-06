import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  Pressable,
  Image,
  ImageBackground,
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

  const imageToLoad = (icons) => {
    switch (icons) {
      case "01d":
        return require("../assets/sunny.jpg");
        break;
      case "02d":
        return require("../assets/partialy.jpg");
        break;
      case "03d":
        return require("../assets/cloudy_light.jpg");
        break;
      case "04d":
        return require("../assets/cloudy.jpg");
        break;
      case "09d":
        return require("../assets/rainy.jpg");
        break;
      case "10d":
        return require("../assets/rainy.jpg");
        break;
      case "11d":
        return require("../assets/stormy.jpg");
        break;
      case "13d":
        return require("../assets/snowy.jpg");
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
        <ImageBackground
          source={imageToLoad(item.weather[0].icon)}
          resizeMode="cover"
        >
          <View style={index == 0 ? styles.firstContainer : styles.container}>
            <View style={index == 0 ? styles.firstRowFull : styles.rowFull}>
              <Ionicons
                name={nameIcons(item.weather[0].icon)}
                size={index == 0 ? 82 : 62}
                color={"white"}
                style={[{ margin: "auto" }]}
              />
            </View>
            <View style={styles.rowHalf}>
              <CustomText size={index == 0 ? 34 : 26} family="Itim_400Regular">
                {dateFormat.day()}
              </CustomText>
            </View>
            <View style={styles.rowHalf}>
              <CustomText size={index == 0 ? 34 : 26} family="Itim_400Regular">
                {dateFormat.date()}
              </CustomText>
            </View>
            <View style={index == 0 ? styles.firstRowFull : styles.rowFull}>
              <CustomText
                size={index == 0 ? 56 : 46}
                style={styles.rowTemp}
                family="Itim_400Regular"
              >
                {Math.floor(item.main.temp)}°C
              </CustomText>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 4,
    borderColor: globalStyle.colorSecond,
    flexWrap: "wrap",
    justifyContent: "center",
    height: 120,
    paddingLeft: 20,
  },
  firstContainer: {
    flexWrap: "wrap",
    justifyContent: "center",
    height: 150,
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
    height: 40,
    marginRight: 4,
  },
  rowTemp: {
    margin: "auto",
  },
});
