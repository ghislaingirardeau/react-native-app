import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  FlatList,
} from "react-native";
import React from "react";

import WeatherRow from "./WeatherRow";
import WeatherSummary from "./WeatherSummary";
import moment from "moment";

//745ddd0bee9f0906beb1a652dd04c5fc

export default function Results({ route, navigation }) {
  // TO GET THE PARAMS OF THE ROUTE FROM THE PARENT
  const { city } = route.params;
  const [loader, setLoader] = React.useState(true);
  const [weatherReport, setWeatherReport] = React.useState({});

  const report = async () => {
    const geoloc = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e3b9191867c7ac728751e62e58afde2d`
    );
    const result = await geoloc.json();
    console.log(result);
    const FrCountry = result.filter((e) => e.country === "FR");
    const { lat, lon } = FrCountry[0];
    const weather = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e3b9191867c7ac728751e62e58afde2d&units=metric`
    );
    const response = await weather.json();
    if (response) {
      let dailyresult = response.list.filter(
        (e) =>
          moment(e.dt * 1000).hour() === 19 || moment(e.dt * 1000).hour() === 10
      );
      const { name, sunrise, sunset } = response.city;

      setLoader(false);
      setWeatherReport({ list: dailyresult, name, sunrise, sunset });
    }
  };

  React.useEffect(() => {
    report();
    /* setTimeout(() => {
      setLoader(false);
    }, 1000); */
  }, [city]);

  const listItems = [
    {
      titre: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
      items: ["Pizza", "Burger", "Risotto"],
    },
    {
      titre: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
      items: ["Pizza", "Burger", "Risotto"],
    },
  ];

  if (loader) {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator animating={loader} size="large" color="green" />
      </View>
    );
  } else {
    return (
      <View>
        {/* <SectionList
          sections={listItems}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <WeatherRow item={item} />}
        /> */}

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
    );
  }
}
