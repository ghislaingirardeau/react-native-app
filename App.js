import { StyleSheet, Text, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import About from "./components/About";
import Home from "./components/Home";
import Results from "./components/Results";

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
          } else if (route.name === "About") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // TO STYLE THE BAR TAB
        //https://reactnavigation.org/docs/material-top-tab-navigator/#tabbarpresscolor
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "powderblue",
          borderTopWidth: 2,
          borderColor: "grey",
          paddingBottom: 5,
          paddingTop: 2,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Welcome",
          headerShown: false, // CHANGE THE NAME IN THE HEADER
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{ headerShown: false }} // HIDE THE HEADER NAME OF THE ROUTE
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true}></StatusBar>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeNav"
            component={HomeNavigation}
            options={{
              title: "Rechercher une ville",
              ...styleHeader,
            }}
          />
          <Stack.Screen
            name="Results"
            component={Results}
            options={({ route }) => ({
              title: `${route.params.city}`,
              headerTintColor: "blue",
              ...styleHeader,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styleHeader = {
  headerTitleStyle: { color: "white" },
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "orange",
  },
};
