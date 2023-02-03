import { View, Text, TouchableHighlight } from "react-native";
import globalStyle from "../../assets/style/style";
import { useState } from "react";

export default function SelectModal({ datas, doOnclick, showModal }) {
  if (datas.length > 1 && showModal) {
    return (
      <View style={globalStyle.homeSelect}>
        <Text style={globalStyle.homeSelectTitle}>Choisis une région</Text>
        {datas.map((elt, index) => (
          <TouchableHighlight
            key={index}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => doOnclick(elt)}
          >
            <View style={globalStyle.homeRowSelect}>
              <Text style={globalStyle.homeRowSelectText}>{elt.state}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}
