import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts, Handlee_400Regular } from "@expo-google-fonts/handlee"; // importer la font que l'on souhaite sur google

import Home from "./pages/Home";
import Card from "./pages/Card";
import FlashCards from "./pages/FlashCards";

import globalStyle from "./assets/style/style";

const Stack = createNativeStackNavigator(); // stack empile les pages avec un bouton de retour
const Tab = createBottomTabNavigator(); // pour avoir des tabs comme navigation
// drawer navigation = pour avoir un menu qui apparait / disparait

function HomeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "FlashCards") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // TO STYLE THE BAR TAB
        //https://reactnavigation.org/docs/material-top-tab-navigator/#tabbarpresscolor
        tabBarActiveTintColor: globalStyle.colorFourth,
        tabBarInactiveTintColor: globalStyle.colorSecond,
        tabBarStyle: {
          backgroundColor: globalStyle.colorPrimary,
          borderTopWidth: 2,
          borderColor: globalStyle.colorSecond,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: "Handlee_400Regular",
          fontSize: 15,
        },
      })}
    >
      <Tab.Screen
        name="FlashCards"
        component={FlashCards}
        options={{
          /* headerShown: false */
          ...styleHeader,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          /* headerShown: false, */ // CHANGE THE NAME IN THE HEADER
          ...styleHeader,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Handlee_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar hidden={true}></StatusBar> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeNav"
            component={HomeNavigation}
            options={({ route }) => ({
              // IF SET ON TRUE GET COMMON TITLE FOR PAGE WELCOME AND ABOUT
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="Card"
            component={Card}
            options={({ route }) => ({
              title: `${route.params.category}`,
              headerTintColor: globalStyle.colorSecond,
              ...styleHeader,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styleHeader = {
  headerTitleStyle: {
    color: globalStyle.colorSecond,
    fontFamily: "Handlee_400Regular",
    fontSize: 25,
  },
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: globalStyle.colorPrimary,
  },
};
