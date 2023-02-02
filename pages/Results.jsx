import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  FlatList,
} from "react-native";
import React from "react";
import { API_KEY } from "@env";

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
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const response = await weather.json();
    if (response) {
      let dailyresult = response.list.filter(
        (e) => moment(e.dt * 1000).hour() === 13
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
            renderItem={({ item, index }) => (
              <WeatherRow item={item} index={index} />
            )}
            keyExtractor={(item, index) => item.dt + index}
          />
        </View>
      )}
    </View>
  );
}
