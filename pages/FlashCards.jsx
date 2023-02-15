import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

export default function FlashCards() {
  return (
    <View style={style.container}>
      <Text>FlashCards page</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
});
