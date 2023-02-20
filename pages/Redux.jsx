import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/actions/countAction";

export default function Home() {
  const dispatch = useDispatch();

  const count = useSelector((store) => store.flashCards.count);

  const handleIncrement = () => {
    dispatch(
      increment({
        key: count.myList.length + 1,
        value: "first value" + count.myList.length,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title_text}>Counter App</Text>
      <Text>{JSON.stringify(count)}</Text>

      <TouchableOpacity onPress={handleIncrement} style={styles.btn}>
        <Text style={styles.btn_text}> Increment </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDecrement}
        style={{ ...styles.btn, backgroundColor: "#6e3b3b" }}
      >
        <Text style={styles.btn_text}> Decrement </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    padding: 50,
  },
  title_text: {
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 55,
  },
  counter_text: {
    fontSize: 35,
    fontWeight: "900",
    margin: 15,
  },
  btn: {
    backgroundColor: "#086972",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  btn_text: {
    fontSize: 23,
    color: "#fff",
  },
});
