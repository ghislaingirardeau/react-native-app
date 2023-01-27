import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  FlatList,
} from "react-native";
import React from "react";

import WeatherRow from "../components/WeatherRow";
import WeatherSummary from "../components/WeatherSummary";
import moment from "moment";

export default function Results({ route, navigation }) {
  // TO GET THE PARAMS OF THE ROUTE FROM THE PARENT
  const { lat, lon, city } = route.params;
  const [loader, setLoader] = React.useState(true);
  const [weatherReport, setWeatherReport] = React.useState({});

  const report = async () => {
    const weather = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e3b9191867c7ac728751e62e58afde2d&units=metric`
    );
    const response = await weather.json();
    if (response) {
      console.log(response);
      let dailyresult = response.list.filter(
        (e) =>
          moment(e.dt * 1000).hour() === 19 ||
          moment(e.dt * 1000).hour() === 13 ||
          moment(e.dt * 1000).hour() === 10
      );
      const { name, sunrise, sunset } = response.city;

      setLoader(false);
      setWeatherReport({ list: dailyresult, name, sunrise, sunset });
    }
  };

  React.useEffect(() => {
    report();
  }, [city]);

  return (
    <View>
      {loader ? (
        <View>
          <Text>Loading...</Text>
          <ActivityIndicator animating={loader} size="large" color="green" />
        </View>
      ) : (
        <View>
          <WeatherSummary
            city={weatherReport.name}
            sunrise={weatherReport.sunrise}
            sunset={weatherReport.sunset}
          />
          <FlatList
            data={weatherReport.list}
            renderItem={({ item }) => <WeatherRow item={item} />}
            keyExtractor={(item, index) => item.dt + index}
          />
        </View>
      )}
    </View>
  );
}
