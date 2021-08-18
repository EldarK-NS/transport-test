import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStackNavigator";
import NewScreen from "./../src/screens/newScreen/NewScreen";
import PostScreen from "./../src/screens/postScreen/PostScreen";
import ProfileScreen from "./../src/screens/profileScreen/ProfileScreen";
import { Feather, FontAwesome, AntDesign } from "@expo/vector-icons";
import AddOrderStack from "./AddOrderStack";

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Main") {
            return <Feather name="home" size={size} color={color} />;
          }
          if (route.name === "NewScreen") {
            return <Feather name="file-text" size={size} color={color} />;
          }
          if (route.name === "AddOrderScreen") {
            return <AntDesign name="pluscircle" size={size} color={color} />;
          }
          if (route.name === "PostScreen") {
            return <FontAwesome name="envelope-o" size={size} color={color} />;
          }
          if (route.name === "Profile") {
            return <Feather name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#008EFF",
        tabBarInactiveTintColor: "#959c97",
        //   tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "#008EFF",
        },
        headerTitleStyle: {
          fontFamily: "IBM-SemiBold",
          color: "white",
        },
      })}
    >
      <Tab.Screen
        name="Main"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="NewScreen" component={NewScreen} />
      <Tab.Screen
        name="AddOrderScreen"
        component={AddOrderStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="PostScreen" component={PostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
