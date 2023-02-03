// Creer un composant juste pour le texte afin de le personnalisé pour tout le document

import { Text } from "react-native";
import { useFonts, Itim_400Regular } from "@expo-google-fonts/itim";
import { Handlee_400Regular } from "@expo-google-fonts/handlee"; // importer la font que l'on souhaite sur google

export default function CustomText(props) {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    Handlee_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text
      style={{
        ...props.style, // to accept the style props si il y en a = style que l'on veut ajouter pour personnaliser
        fontSize: props.size, // style qui sera commune a chaque utilisation du component
        fontFamily: props.family,
        color: "#FFD166",
      }}
    >
      {props.children}{" "}
      {/* le contenu qui sera inserer entre les tag du composant */}
    </Text>
  );
}
