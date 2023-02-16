import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

export default function CardPage({ route, navigation }) {
  const list = JSON.parse(route.params.list);

  console.log(list);
  return (
    <View style={style.container}>
      <Text>Card page</Text>
      {list.map((item, index) => {
        return (
          <View key={item.id}>
            <Text>{item.from}</Text>
            <Text>{item.to}</Text>
          </View>
        );
      })}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
});
