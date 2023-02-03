import { View, Text, TouchableHighlight } from "react-native";
import globalStyle from "../../assets/style/style";

export default function SelectModal({ datas, doOnclick }) {
  return (
    <View style={globalStyle.homeSelect}>
      {datas.length > 1 ? (
        <View>
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
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
