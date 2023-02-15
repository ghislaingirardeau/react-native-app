import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

export default function CardPage() {
  return (
    <View style={style.container}>
      <Text>Card page</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
});
